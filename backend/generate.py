from dotenv import load_dotenv
import os
import asyncio

from anthropic import AsyncAnthropic
from openai import AsyncOpenAI

load_dotenv()

client = AsyncAnthropic(
    api_key=os.environ.get("ANTHROPIC_API_KEY"),
)

openai_client = AsyncOpenAI()

async def generate_lyrics(prompt):
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
    return lyrics

async def generate_timestamps():
    audio_file = open("temp.mp3", "rb")
    transcript = await openai_client.audio.transcriptions.create(
        file=audio_file,
        model="whisper-1",
        response_format="verbose_json",
        timestamp_granularities=["word"]
    )
    
    return transcript.words

if __name__ == "__main__":
    asyncio.run(generate_timestamps())