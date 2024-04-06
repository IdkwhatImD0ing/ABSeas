from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from anthropic import AsyncAnthropic
from socket import ConnectionManager


load_dotenv()  # take environment variables from .env.

client = AsyncAnthropic(
    api_key=os.environ.get("ANTHROPIC_API_KEY"),
)

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

    message = await client.messages.create(
        max_tokens=512,
        system="""
You are a songwriter for kids. 
You specialize in pirate-themed sea shanties.
A song should include pirate-themed objects and ideas.
Incorporate additional information in the song to teach kids about the topic.

Make it very short, simple in vocabulary, and incorporate rhyming. 
Add pirate vocalizations in parentheses. 
For example: (arr!), (yo-ho!), (ahoy!), and (avast!)

Remember: this is for kids. No mature themes, alcohol references, violence.

Output only a song:
[Verse]
...
[Chorus]
...
[Verse]
...
[Chorus]
...
""",
        messages=[
            {
                "role": "user",
                "content": prompt.prompt,
            }
        ],
        model="claude-3-opus-20240229",
        temperature=0.8
    )
    lyrics = message.content[0].text
    print(lyrics)
    # parse out the response
    return {"Lyrics": lyrics}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, client_id: str | None = None):
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
                prompt = data["prompt"]
                message = await client.messages.create(
                max_tokens=512,
                system="""
You are a songwriter for kids. 
You specialize in pirate-themed sea shanties.
A song should include pirate-themed objects and ideas.
Incorporate additional information in the song to teach kids about the topic.

Make it very short, simple in vocabulary, and incorporate rhyming. 
Add pirate vocalizations in parentheses. 
For example: (arr!), (yo-ho!), (ahoy!), and (avast!)

Remember: this is for kids. No mature themes, alcohol references, violence.

Output only a song:
[Verse]
...
[Chorus]
...
[Verse]
...
[Chorus]
...
""",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="claude-3-opus-20240229",
        temperature=0.8
    )
                lyrics = message.content[0].text
                print(lyrics)
    except WebSocketDisconnect:
        print("Disconnecting...")
        await manager.disconnect(client_id)