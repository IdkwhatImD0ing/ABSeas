from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from socket_manager import ConnectionManager
from generate import generate_lyrics
from suno_wrapper import generate_and_broadcast_music
from typing import Optional

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


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/song")
async def get_song(prompt: Prompt):

    lyrics = await generate_lyrics(prompt)
    return {"Lyrics": lyrics}


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