import asyncio
from dotenv import load_dotenv
import aiohttp
import os

load_dotenv()

from suno import SongsGen
from concurrent.futures import ThreadPoolExecutor

from io import BytesIO
import base64


from openai import AsyncOpenAI
import tempfile


async def generate_and_broadcast_music(lyrics):
    GenerateSong = SongsGen(os.environ.get("SUNO_COOKIE"))
    print(GenerateSong.get_limit_left())
    
    # Obtain the current running asyncio event loop.
    loop = asyncio.get_running_loop()

    result = None
    # Use a ThreadPoolExecutor to run blocking (synchronous) operations in separate threads.
    with ThreadPoolExecutor() as pool:
        # Run the song generation function in a thread and wait for its completion.
        result = await loop.run_in_executor(
            pool,
            lambda: GenerateSong.get_songs(lyrics, is_custom=True, title="custom", tags="upbeat, catchy, maritime, pirate"),
        )

    # If song generation fails, return None.
    if not result:
        return None

    # Extract the song URL from the generation result.
    link = result["song_url"]
    print("Link: ", link)
    
    # Retrieve the song audio content via a streaming HTTP request.
    response = GenerateSong.session.get(link, stream=True)
    audio = response.iter_content()
    return audio

async def transcribe_audio(audio):
    client = AsyncOpenAI()
    with tempfile.NamedTemporaryFile(
            suffix=".mp3", mode="wb", delete=True
        ) as temp_audio_file:
        temp_audio_file.write(audio)
        temp_audio_file.flush()
        temp_audio_file.seek(0)

        with open(temp_audio_file.name, "rb") as audio_file:
            transcript_obj = await client.audio.transcriptions.create(
                model="whisper-1", file=audio_file, response_format="verbose_json", timestamp_granularities=['word']
            )
    return transcript_obj.words