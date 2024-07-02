from authlib.integrations.starlette_client import OAuth
from authlib.integrations.base_client.errors import OAuthError
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import FileResponse, JSONResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
import os
from starlette.config import Config
from starlette.middleware.sessions import SessionMiddleware
from starlette.middleware.cors import CORSMiddleware
import google.generativeai as genai
import logging
from functools import wraps

from pydantic_models import Prompt, Product
from model import Model
from util import verify_token

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
logging.basicConfig(level=logging.INFO)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.add_middleware(
    SessionMiddleware, secret_key=os.getenv("SECRET_KEY")
)  # required for auth

config = Config(".env")
oauth = OAuth(config)
oauth.register(
    "auth0",
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f'https://{os.getenv("AUTH0_DOMAIN")}/.well-known/openid-configuration',
)
model = Model()


# Frontend endpoints

app.mount("/static", StaticFiles(directory="./frontend/build/static"), name="static")


@app.get("/")
def main():
    return FileResponse("./frontend/build/index.html")


@app.get("/favicon.ico")
def favicon():
    return FileResponse("./frontend/build/favicon.ico")


@app.get("/manifest.json")
def manifest():
    return FileResponse("./frontend/build/manifest.json")


# Other endpoints


def require_login(f):
    # Decorator for APIs that require authentication
    # API function needs to have 'request' parameter
    @wraps(f)
    def wrapper(*args, **kwargs):
        verify_token(request=kwargs["request"])
        return f(*args, **kwargs)

    return wrapper


@app.get("/login")
async def login(request: Request):
    res = await oauth.auth0.authorize_redirect(
        request,
        redirect_uri=request.url_for("token"),
        audience=os.getenv("AUTH0_AUDIENCE"),
    )

    return res


@app.get("/token")
async def token(request: Request):
    auth_response = await oauth.auth0.authorize_access_token(
        request, audience=os.getenv("AUTH0_AUDIENCE")
    )
    response = JSONResponse(auth_response["userinfo"])
    response.set_cookie("token", auth_response["access_token"])
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    redRes = RedirectResponse(
        url="http://localhost:3000/home/" + auth_response["access_token"],
    )
    redRes.set_cookie("token", auth_response["access_token"])
    return redRes


# @require_login
@app.post("/prompt")
def prompt(request: Request, body: Prompt) -> list[Product]:
    return model.query(body)


# Exception handling

BAD_REQUEST_RESPONSE = JSONResponse(
    {"message": "The request param or body is malformed."}, 400
)

UNAUTHORISED_RESPONSE = JSONResponse(
    {"message": "You are not authorised to view this page. Please login first!"}, 401
)

ERROR_RESPONSE = JSONResponse({"message": "An unexpected error occurred."}, 500)


@app.exception_handler(RequestValidationError)
async def handle_validation_error(_0, _1):
    return BAD_REQUEST_RESPONSE


@app.exception_handler(OAuthError)
async def handle_auth_error(_0, _1):
    return UNAUTHORISED_RESPONSE


@app.exception_handler(404)
def handle_404(_0, _1):
    return FileResponse("./frontend/build/index.html")


@app.exception_handler(Exception)
async def handle_unchecked_error(_0, _1):
    return ERROR_RESPONSE
