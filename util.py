from fastapi import Request
import jwt
from os import environ as env
from authlib.integrations.base_client.errors import OAuthError
import logging

auth0_issuer_url = f'https://{env.get("AUTH0_DOMAIN")}/'
auth0_audience = env.get("AUTH0_AUDIENCE")
client: jwt.PyJWKClient = jwt.PyJWKClient(f'{auth0_issuer_url}.well-known/jwks.json')
logger = logging.getLogger("token")

def verify_token(request: Request):
    token = request.cookies.get('token')
    if not token:
        logger.warning("No token found in cookies")
        raise OAuthError()
    try:
        kid = jwt.get_unverified_header(token)['kid']
        signing_key = client.get_signing_key(kid).key
        claim = jwt.decode(token, signing_key, algorithms="RS256", issuer=auth0_issuer_url, audience=auth0_audience)
        if auth0_audience not in claim['aud']:
            logger.warning("Invalid audience")
            raise OAuthError()
    except Exception as e:
        logger.error(f"Failed to validate token {token} with error: {e}")
        raise OAuthError()
