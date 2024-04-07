from dotenv import load_dotenv
import os
from anthropic import AsyncAnthropic

load_dotenv()

client = AsyncAnthropic(
    api_key=os.environ.get("ANTHROPIC_API_KEY"),
)

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
