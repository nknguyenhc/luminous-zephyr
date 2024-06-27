from functools import partial
import google.generativeai as genai
import logging

class QueryException(Exception):
    def __init__(self, message: str):
        super().__init__(f"Failed to query to the LLM: {message}")

class GeminiModel:
    def __init__(self, base: partial[str]):
        self.base = base
        self.client = genai.GenerativeModel('gemini-1.5-flash')
        self.logger = logging.getLogger("GeminiModel")

    def query(self, **kwargs) -> str:
        response = self.client.generate_content(self.base(**kwargs)).candidates[0]
        if not hasattr(response, 'content'):
            raise QueryException('LLM response does not have content')
        text = response.content.parts[0].text
        self.logger.debug(f"Query response: {text}")
        return text

if __name__ == '__main__':
    from dotenv import load_dotenv
    import os

    load_dotenv()
    genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
    logging.basicConfig(level=logging.DEBUG)

    model = GeminiModel("{prompt}".format)
    model.query(prompt="Hello, how are you today?")
