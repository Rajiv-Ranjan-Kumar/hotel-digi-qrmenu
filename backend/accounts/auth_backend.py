import datetime
from functools import wraps
import jwt
from django.conf import settings
from typing import Dict
from ninja.security import HttpBearer
from ninja.errors import HttpError
from accounts.models import User







# ✅ Generate JWT token
def generate_jwt_token(user: User) -> str:
    expiration_time = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)
    payload = {
        "user_id": user.id,
        "email": user.email,
        "role": getattr(user.role.role, "name", None),
        "exp": expiration_time.timestamp(),
    }

    try:
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
        return token
    except Exception as e:
        raise HttpError(status_code=500, message=f"An error occurred while generating JWT token: {e}")










# ✅ Decode JWT token
def decode_jwt_token(token: str) -> Dict:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        return payload

    except jwt.ExpiredSignatureError:
        raise HttpError(status_code=401, message="Token has expired")
    except jwt.InvalidTokenError:
        raise HttpError(status_code=401, message="Invalid token")
    except Exception as e:
        raise HttpError(status_code=500, message=f"Token decoding failed: {e}")










# ✅ Custom Auth class
class GlobalAuth(HttpBearer):
    def authenticate(self, request, token):
        try:
            decoded_token = decode_jwt_token(token)
            user_id = decoded_token.get("user_id")
            role = decoded_token.get("role")

            if not user_id or not role:
                raise HttpError(401, "Invalid token data")

            request.user_id = user_id
            request.user_role = role
            return decoded_token

        except HttpError:
            raise
        except Exception as e:
            raise HttpError(status_code=500, message=f"Authentication failed: {e}")