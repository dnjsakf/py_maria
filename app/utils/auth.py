import jwt
import traceback

from functools import wraps
from flask import current_app as app, request

import app.utils.datetime as dt

def make_token(data):
  payload = {
    "sub": request.host
    , "iss": "jwt_tester"
    , "exp": dt.nowTS(minutes=30)
  }
  
  if isinstance(data, dict):
    payload.update(data)
  
  return jwt.encode(payload, app.secret_key, algorithm='HS256')

def check_login( func ):
  @wraps( func )
  def wrapper(*args, **kwargs):
    user = None
    try:
      token = request.cookies.get("access_token")
      
      if token is not None:      
        decoded_token = jwt.decode(token, app.secret_key, algorithm='HS256')
        
        print( decoded_token )
        
        user = decoded_token.get("user", None)
    except Exception as e:
      traceback.print_exc()
    finally:
      return func(user, *args, **kwargs)
  return wrapper
