import asyncio
from dotenv import load_dotenv
import aiohttp
import os

load_dotenv()
import nest_asyncio

nest_asyncio.apply()
from suno import SongsGen
from concurrent.futures import ThreadPoolExecutor

from io import BytesIO
import base64

async def generate_and_broadcast_music(lyrics, manager):
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
            lambda: GenerateSong.get_songs(lyrics, is_custom=True, title="custom", tags="slow, catchy, maritime, pirate"),
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
    for chunk in audio:
        if chunk:
            # Encode each chunk into base64 to prepare it for transmission.
            b64 = base64.b64encode(chunk)
            # Decode the base64 content into a UTF-8 string.
            utf = b64.decode('utf-8')
            # Create a dictionary object to store the audio chunk.
            obj = {
                "event": "audio",
                "audio_data": utf
            }
            # Broadcast the audio chunk to listeners.
            await manager.broadcast(obj)    
    
    return link