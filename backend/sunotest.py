import asyncio
from dotenv import load_dotenv
import aiohttp

load_dotenv()
import nest_asyncio

nest_asyncio.apply()
from suno import SongsGen
from concurrent.futures import ThreadPoolExecutor


async def async_generate_music(lyrics):
    i = SongsGen(os.environ.get("SUNO_COOKIE"))
    print(i.get_limit_left())
    loop = asyncio.get_running_loop()

    result = None
    # Use a ThreadPoolExecutor to run synchronous functions in threads
    with ThreadPoolExecutor() as pool:
        result = await loop.run_in_executor(
            pool,
            lambda: i.get_songs(lyrics, is_custom = True, title = "custom", tags = "slow, catchy, maritime, pirate"),
        )

    if not result:
        return None

    link = result["song_url"]
    print("Link: ", link)

    attempt = 0
    retry_delay = 5
    async with aiohttp.ClientSession() as session:
        while attempt < 5:
            async with session.get(link) as response:
                if response.status == 200:
                    data = await response.read()
                    # Check if data is not empty
                    if data:
                        return data
                    else:
                        print("No data received, retrying in 5 seconds...")
                else:
                    print(
                        f"Failed to fetch the song, status code: {response.status}, retrying in 5 seconds..."
                    )
            await asyncio.sleep(retry_delay)  # Async sleep for retry_delay seconds
            attempt += 1

    print("Failed to fetch the song after retries")
    
    
    audio = i.get_mp3(link, stream=True)
    buffer = BytesIO()
    desired_chunk_size = 48000
    async def process_and_send_large_chunk():
        # Check if the buffer has enough data to process
        # You can adjust the size check as needed
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
                "event": "audio",
                "audio_data": utf,
                "title": title,
                "lyrics": lyrics,
                "genre": genre,
                "topic": manager.selected_topic
            }
            
            # Wait for broadcasting to run
            await manager.broadcast(obj)
            
            # Clear the buffer after sending
            buffer.seek(0)
            buffer.truncate()
            
    for chunk in audio:
        if chunk:
            # translates binary to base64 string
            buffer.write(chunk)
            await print("sending chunk")
            await process_and_send_large_chunk()


async_generate_music(
    
        """
        Verse 1:
When yer sailin' on the seas (yo-ho!)
And you've got some tasty treats (arr!)
Don't forget to share with mates
That's what every pirate states! (ahoy!)

Chorus:
Sharin' is carin', me hearties know
It fills our hearts with a friendly glow
Whether it's treasure or a yummy snack
Sharin' with others keeps the smiles on track! (yo-ho!)

Verse 2:
If you've got a shiny coin (avast!)
Or a scrumptious candy growin'
Pass it 'round to all yer crew
Sharin' makes the skies more blue! (arr!)

Chorus:
Sharin' is carin', me hearties know
It fills our hearts with a friendly glow

Whether it's treasure or a yummy snack
Sharin' with others keeps the smiles on track! (yo-ho!)
        """
)