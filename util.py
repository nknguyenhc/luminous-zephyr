from fastapi import Request
import jwt
from os import environ as env

auth0_issuer_url = f'https://{env.get("AUTH0_DOMAIN")}/'
auth0_audience = env.get("AUTH0_AUDIENCE")
client: jwt.PyJWKClient = jwt.PyJWKClient(f'{auth0_issuer_url}.well-known/jwks.json')

def verify_token(request: Request):
    token = request.cookies.get('token')
    if not token:
        return False
    try:
        kid = jwt.get_unverified_header(token)['kid']
        signing_key = client.get_signing_key(kid).key
        claim = jwt.decode(token, signing_key, algorithms="RS256", issuer=auth0_issuer_url, audience=auth0_audience)
        return auth0_audience in claim['aud']
    except Exception:
        return False
