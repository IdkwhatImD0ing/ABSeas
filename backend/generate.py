from dotenv import load_dotenv
import os
from anthropic import AsyncAnthropic

load_dotenv()

client = AsyncAnthropic(
    api_key=os.environ.get("ANTHROPIC_API_KEY"),
)
