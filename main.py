from authlib.integrations.starlette_client import OAuth
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from os import environ as env
from starlette.config import Config
from starlette.middleware.sessions import SessionMiddleware
from starlette.requests import Request
import google.generativeai as genai
import logging
from pydantic_models import Prompt, Product
from model import Model

load_dotenv()

genai.configure(api_key=env.get('GEMINI_API_KEY'))
logging.basicConfig(level=logging.INFO)

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=env.get("SECRET_KEY"))

config = Config('.env')
oauth = OAuth(config)
oauth.register(
    'auth0',
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f'https://{env.get("AUTH0_DOMAIN")}/.well-known/openid-configuration',
)


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

@app.get("/login")
async def login(request: Request):
    redirect_uri = request.url_for("test")
    print(redirect_uri)
    return await oauth.auth0.authorize_redirect(
        request,
        redirect_uri=redirect_uri
    )

@app.get("/test")
async def test(request: Request):
    token = await oauth.auth0.authorize_access_token(request)
    user = token['userinfo']
    return user

# Other endpoints

@app.post('/prompt')
def prompt(body: Prompt) -> list[Product]:
    model = Model()
    return model.query(body.prompt)

@app.exception_handler(404)
def handle_404(_0, _1):
    return FileResponse('./frontend/build/index.html')
