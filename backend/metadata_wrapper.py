import asyncio
from dotenv import load_dotenv
load_dotenv()

import aiohttp
import os
import json
from PIL import Image
from io import BytesIO
import base64

import cv2
import numpy as np

from anthropic import AsyncAnthropic
from openai import AsyncOpenAI

from transparent_background import Remover
from elevenlabs.client import AsyncElevenLabs
from elevenlabs import Voice, VoiceSettings

prompt = """
You are given lyrics from a song that I created.
You are in charge of making a list of pictures relating to the song
The pictures should be relevant to the text and be of individual items only.
Each description should start with: a simple kid friendly cartoon illustration of...
End with: on a white background
Please give me 6 descriptions.

Return a valid json list of objects:
description: description of the item
word: One word description
learning: connection between the item and the song that can be understood by a three year old
Example output
[
    {
      description: "a simple kid friendly cartoon illustration of a pirate hat on a white background",
      word: "hat",
      learning: "Pirates wear hats."
    }
]
"""

async def generate_metadata(lyrics):
    client = AsyncAnthropic(
        # This is the default and can be omitted
        api_key=os.environ.get("ANTHROPIC_API_KEY"),
    )
    openai_client = AsyncOpenAI()
    remover = Remover()
    eleven_client = AsyncElevenLabs(
        api_key=os.environ.get("ELEVENLABS_API_KEY"),
    )
    semaphore = asyncio.Semaphore(5)
    async def generate_text(text, script):
        message = await client.messages.create(
            temperature=0.5,
            max_tokens=1024,
            messages=[
                {
                    "role": "user",
                    "content": text + script,
                },
                {"role": "assistant", "content": "["},
            ],
            model="claude-3-opus-20240229",
        )

        return message.content
    
    async def fetch_image_binary(url):
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                # Make sure the request was successful
                if response.status == 200:
                    # Read and return the binary content of the image
                    return await response.read()
                else:
                    # Handle possible HTTP errors (e.g., 404 Not Found) here if needed
                    return None


    async def generate_image(description):
        response = await openai_client.images.generate(
            model="dall-e-3",
            prompt=description,
            size="1024x1024",
            quality="standard",
            n=1,
        )
        image_binary = await fetch_image_binary(response.data[0].url)
        return image_binary


    async def generate_images(pictures):
        tasks = [generate_image(picture['description']) for picture in pictures]
        imgs = await asyncio.gather(*tasks)
        return imgs
    
    async def text_to_speech(text, index):
        # Acquire a semaphore
        async with semaphore:
            audio = await eleven_client.generate(
                text=text,
                voice=Voice(
                    voice_id='Djuu0cAOk0e1MdFhrmnj',
                    settings=VoiceSettings(stability=0.3, similarity_boost=0.75, style=0.0, use_speaker_boost=True)
                ),
                model="eleven_multilingual_v2"
            )
            
            out = b''
            async for value in audio:
                out += value
                
        # The semaphore is automatically released when the block is exited
        return out

    async def generate_audios(pictures):
        tasks = [text_to_speech(picture['learning'], i) for i, picture in enumerate(pictures)]
        audios = await asyncio.gather(*tasks)
        return audios


    pictures = await generate_text(lyrics, prompt)
    pictures = json.loads("["+pictures[0].text)
    imgs = await generate_images(pictures)
    removed = [remover.process(Image.open(BytesIO(img))) for img in imgs]
    b64_imgs = []
    for img in removed:
        buffered = BytesIO()
        # Convert rgba 
        img = img.convert("RGB")
        img.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        b64_imgs.append(img_str)
    
    # audios is a list of bytes
    # Let's convert them to b64 strings
    
    audios = await generate_audios(pictures)
    b64_audios = [base64.b64encode(audio).decode("utf-8") for audio in audios]
    
    pictures_data = [
        {
            "image": b64_imgs[i],
            "audio": b64_audios[i],
            "word": picture["word"],
            "learning": picture["learning"],
        } for i, picture in enumerate(pictures)
    ]
    
    return pictures_data
    