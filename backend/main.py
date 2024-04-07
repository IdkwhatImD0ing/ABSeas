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
                for chunk in audio:
                    if chunk:
                        # Encode each chunk into base64 to prepare it for transmission.
                        b64 = base64.b64encode(chunk)
                        # Decode the base64 content into a UTF-8 string.
                        utf = b64.decode('utf-8')
                        # Create a dictionary object to store the audio chunk.
                        obj = {
                            "audio": utf
                        }
                        audio_data += chunk
                        # Broadcast the audio chunk to listeners.
                        await manager.send_personal_message(obj, websocket)  
                # metadata_task = asyncio.create_task(generate_metadata(lyrics, manager, websocket))
                # audio_task = asyncio.create_task(generate_and_broadcast_music(lyrics, manager, websocket))
                # await metadata_task
                # audio = await audio_task
                
                
                # Generate a unique song name using uuid
                unique_song_name = prompt.replace(" ", "").strip() + str(uuid.uuid4()) 
                
                # Combine all data in the expected format
                song_document = {
                    'song_name': unique_song_name, # This will serve as a unique identifier
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

                # print(unique_song_name, song_url)
                
                # # Upload the document to Firestore
                # db = firestore.client()
                # doc_ref = db.collection('songs').document(unique_song_name)
                # doc_ref.set(song_document)
                
                
                await manager.send_personal_message({"end_song": "done"}, websocket)
                timestamps = await transcribe_audio(audio_data)
                await manager.send_personal_message({"timestamps": timestamps}, websocket)
                
                
    except WebSocketDisconnect:
        print("Disconnecting...")
        await manager.disconnect(client_id)