import traceback

from functools import wraps
from flask import request
from jwt.exceptions import DecodeError

from app.utils.security.token import Token

def with_cookies(attr=None):
  def decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
      cookies = request.cookies.copy()
      
      if isinstance(attr, list):
        temp = dict()
        for key in attr:
          temp[key] = cookies.get(key, None)
        return func(*args, **temp, **kwargs)
        
      elif isinstance(attr, str):
        temp = dict()
        temp[attr] = cookies.get(attr, None)
        return func(*args, **temp, **kwargs)
        
      else:
        return func(*args, cookies=cookies, **kwargs)
    return wrapper
  return decorator

def check_token(attr=None):
  def decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
      token = None
      
      auth = request.headers.get("Authorization", None)      
      if auth is not None:
        token = auth.split(" ")[-1]
    
      #token = kwargs.get("access_token", None)
      
      payload = Token.check(token, attr)
      
      return func(*args, **payload, **kwargs)
    return wrapper
  return decorator
