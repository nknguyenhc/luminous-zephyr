from authlib.integrations.starlette_client import OAuth
from dotenv import load_dotenv
from fastapi import FastAPI, Request, Depends
from fastapi.responses import FileResponse, RedirectResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from os import environ as env
from starlette.config import Config
from starlette.middleware.sessions import SessionMiddleware
import google.generativeai as genai
import logging
from pydantic_models import Prompt, Product
from model import Model
from typing import Annotated
from util import verify_token

load_dotenv()

genai.configure(api_key=env.get('GEMINI_API_KEY'))
logging.basicConfig(level=logging.INFO)

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=env.get('SECRET_KEY')) # required for auth

config = Config('.env')
oauth = OAuth(config)
oauth.register(
    'auth0',
    client_kwargs={
        'scope': 'openid profile email',
    },
    server_metadata_url=f'https://{env.get("AUTH0_DOMAIN")}/.well-known/openid-configuration',
)
model = Model()


# Frontend endpoints

app.mount('/static', StaticFiles(directory='./frontend/build/static'), name='static')

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

@app.post('/login')
async def login(request: Request):
    return await oauth.auth0.authorize_redirect(
        request,
        redirect_uri=request.url_for('token'),
        audience=env.get("AUTH0_AUDIENCE")
    )

@app.get('/token')
async def token(request: Request):
    try:
        auth_response = await oauth.auth0.authorize_access_token(request, audience=env.get("AUTH0_AUDIENCE"))
    except Exception:
        return RedirectResponse(request.url_for('main'))
    response = JSONResponse(auth_response['userinfo'])
    response.set_cookie('token', auth_response['access_token'])
    return response

@app.post('/prompt')
def prompt(body: Prompt, authenticated: Annotated[bool, Depends(verify_token)]) -> list[Product]:
    if not authenticated:
        return RedirectResponse('/')
    return model.query(body.prompt)

@app.exception_handler(404)
def handle_404(_0, _1):
    return FileResponse('./frontend/build/index.html')
