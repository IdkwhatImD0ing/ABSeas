from dotenv import load_dotenv
load_dotenv()  # take environment variables from .env.
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from socket_manager import ConnectionManager
from generate import generate_lyrics
from suno_wrapper import generate_and_broadcast_music, transcribe_audio
from metadata_wrapper import generate_metadata
from typing import Optional
import os
import firebase_admin
from firebase_admin import credentials, storage, firestore
import asyncio
import base64
import uuid
import json
from starlette.responses import JSONResponse
import requests
from io import BytesIO
 

class Prompt(BaseModel):
    prompt: str

app = FastAPI()

origins = ["*"]

manager = ConnectionManager()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the Firebase Admin SDK
cred = credentials.Certificate('./abseas_service_account_key.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': 'abseas-8416d.appspot.com'
})

# Initialize Firebase Storage
bucket = storage.bucket()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/song")
async def get_song(prompt: Prompt):

    lyrics = await generate_lyrics(prompt)
    return {"Lyrics": lyrics}

@app.post("/upload")
async def upload_audio(file: UploadFile = File(...)):
    # Check if the file is an MP3
    if not file.filename.endswith(".mp3"):
        raise HTTPException(status_code=400, detail="File must be an MP3.")
    try:

        # Create a new blob in Firebase Storage
        file_name = file.filename
        file_name = "test21.mp3"
        blob = bucket.blob(f"songs/{file_name}")

        # Upload the file
        blob.upload_from_string(await file.read(), content_type=file.content_type)

        return {"message": f"File '{file.filename}' uploaded successfully."}
    except Exception as e:
        print(e)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, client_id: Optional[str] = None):
    if client_id is None:
        client_id = websocket.query_params.get("client_id")

    if client_id is None:
        await websocket.close(code=4001)
        return
    # save this client into server memory
    await manager.connect(websocket, client_id)  
    try:
        while True:
            data = await websocket.receive_json()
            event = data["event"]
            if event == "generate":
                print("Generate")
                prompt = data["prompt"]
                lyrics = await generate_lyrics(prompt)
                print("Finished lyrics:")
                # Find the index of [Verse]
                index = lyrics.index("[Verse]")

                # Extract the substring starting from [Verse]
                lyrics = lyrics[index:]
                await manager.send_personal_message({"lyrics": lyrics}, websocket)
                
                metadata_task  = asyncio.create_task(generate_metadata(lyrics, manager, websocket))
                generate_task = asyncio.create_task(generate_and_broadcast_music(lyrics))
                metadata_result = await metadata_task
                song_url, audio = await generate_task
                audio_data = b''
                buffer = BytesIO()
                desired_chunk_size = 48000
                
                async def process_and_send_large_chunk():
                    if buffer.getbuffer().nbytes >= desired_chunk_size:
                        # Reset buffer position to the start
                        buffer.seek(0)

                        # Read the data from the buffer
                        large_chunk = buffer.read()

                        # Translate binary to base64 string
                        b64 = base64.b64encode(large_chunk)

                        # Decode the base64 binary object into a string
                        utf = b64.decode('utf-8')

                        # Create a dict object that stores the event as an audio chunk and sets the audio data to utf format
                        obj = {
                            "audio": utf
                        }
                        # Wait for broadcasting to run
                        await manager.send_personal_message(obj, websocket) 
                        
                        # Clear the buffer after sending
                        buffer.seek(0)
                        buffer.truncate()
                
                for chunk in audio:
                    if chunk:
                        buffer.write(chunk) 
                        audio_data += chunk   
                        await process_and_send_large_chunk()
                         
                # metadata_task = asyncio.create_task(generate_metadata(lyrics, manager, websocket))
                # audio_task = asyncio.create_task(generate_and_broadcast_music(lyrics, manager, websocket))
                # await metadata_task
                # audio = await audio_task
                
                # Generate a unique song name using uuid
                unique_song_name = prompt.replace(" ", "").strip() + str(uuid.uuid4()) 
                
                # Combine all data in the expected format
                song_document = {
                    'song_name': unique_song_name, # This will serve as a unique identifier
                    'lyrics': lyrics,
                    # 'transcript': timestamps,
                    'song_url': song_url,
                    'images': metadata_result
                }
                song_document_json = json.dumps(song_document)

                # Create a unique filename for the JSON file
                json_filename = f"{unique_song_name}.json"
                
                # Create a new blob in Firebase Storage to store the JSON
                blob = bucket.blob(f'song_data/{json_filename}')  # 'song_data' is a directory in the bucket

                # Upload the JSON data as a file to Firebase Storage
                blob.upload_from_string(
                    song_document_json,
                    content_type='application/json'
                )

                print(f"JSON file '{json_filename}' uploaded successfully.")
                
                await manager.send_personal_message({"end_song": "done"}, websocket)
                timestamps = await transcribe_audio(audio_data)
                await manager.send_personal_message({"timestamps": timestamps}, websocket)
                

            elif event == "retrieve":
                print("Retrieve Data")
                file_name = data["file_name"]

                # Create a blob object for the file
                blob = bucket.blob(f"song_data/{file_name}")

                # Download the file content
                content = blob.download_as_text()
                content_dict = json.loads(content)
                print(list(content_dict.keys()))
                
                await manager.send_personal_message({"lyrics": content_dict['lyrics']}, websocket)
                
                response = requests.get(content_dict['song_url'])
                if response.status_code != 200:
                    raise Exception(f"Failed to fetch MP3: HTTP {response.status_code}")

                # Encode the bytes of the MP3 file to Base64
                encoded_content = base64.b64encode(response.content)
                # Convert Base64 bytes to a string for easier handling
                encoded_str = encoded_content.decode('utf-8')
                await manager.send_personal_message({"audio": encoded_str}, websocket) 
                await manager.send_personal_message({"end_song": "done"}, websocket)
                print("finished")                
                

                # # Get song audio data
                # response = requests.get(content_dict["song_url"])
                # if response.status_code != 200:
                #     raise Exception(f"Failed to download MP3: HTTP {response.status_code}")
                
                # new_song_state = {
                #     "isFinished": True,
                #     "lyrics": content_dict["lyrics"],
                #     "songAudio": response.content,
                #     "transcript": content_dict["transcript"],
                #     "metadata": content_dict["images"],
                    
                # }
                
                
    # """{
    #     isFinished: true,
    #     lyrics: '',
    #     songAudio: null,
    #     transcript: [],
    #     metadata: [],
    #     mediaSource: null,
    #   }
    # """
                # # Convert the content to JSON and send it through the websocket
                # await manager.send_personal_message({"song_data": json.loads(content)}, websocket)
                # print(f"JSON file {file_name}' sent successfully.")

    except WebSocketDisconnect:
        print("Disconnecting...")
        await manager.disconnect(client_id)