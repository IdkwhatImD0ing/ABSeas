from fastapi import FastAPI, WebSocket, WebSocketDisconnect, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from socket_manager import ConnectionManager
from generate import generate_lyrics
from suno_wrapper import generate_and_broadcast_music
from typing import Optional
import os
import firebase_admin
from firebase_admin import credentials, storage

load_dotenv()  # take environment variables from .env.

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
cred = credentials.Certificate('../abseas_service_account_key.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': 'abseas-8416d.appspot.com'
})

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
        # Initialize Firebase Storage
        bucket = storage.bucket()

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
                print(lyrics)
                link = await generate_and_broadcast_music(lyrics, manager)
                print(link)
                
    except WebSocketDisconnect:
        print("Disconnecting...")
        await manager.disconnect(client_id)