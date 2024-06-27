from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
import google.generativeai as genai
import os
import logging

from pydantic_models import Prompt, Product
from model import Model

load_dotenv()
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
logging.basicConfig(level=logging.INFO)

app = FastAPI()

# Frontend endpoints

app.mount("/static", StaticFiles(directory="./frontend/build/static"), name="static")

@app.get('/')
def main():
    return FileResponse('./frontend/build/index.html')

@app.get('/favicon.ico')
def favicon():
    return FileResponse('./frontend/build/favicon.ico')

@app.get('/manifest.json')
def manifest():
    return FileResponse('./frontend/build/manifest.json')

# Other endpoints

@app.post('/prompt')
def prompt(body: Prompt) -> list[Product]:
    model = Model()
    return model.query(body.prompt)

@app.exception_handler(404)
def handle_404(_0, _1):
    return FileResponse('./frontend/build/index.html')
