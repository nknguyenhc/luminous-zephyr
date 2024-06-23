from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

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

@app.exception_handler(404)
def handle_404(_0, _1):
    return FileResponse('./frontend/build/index.html')
