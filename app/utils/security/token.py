import jwt
import traceback

from app.utils.time import datetime as dt
from app.exceptions import NotExistsToken


class Token(object):
  secret_key = "Dochi Secret Key"
  algorithm = "HS256"
  
  subject = "dochi_login_token"
  issuer = "dochi"
  issued = None
  expires = 30
  
  @classmethod
  def make(cls, data, expires=30):
    payload = {
      "sub": cls.subject,
      "iss": cls.issuer,
      "iat": dt.nowTS() # issued dt
    }
    
    # Set Optional payloads
    if isinstance(data, dict):
      payload.update(data)
    
    if isinstance(expires, int):
      payload["exp"] = dt.nowTS(minutes=expires) # expires
    
    return jwt.encode(payload, cls.secret_key, algorithm=cls.algorithm)
    
  @classmethod
  def check(cls, token, attr=None):
    try:
      assert token is not None, NotExistsToken("Not exists token.")
        
      payload = jwt.decode(token, cls.secret_key, algorithm=cls.algorithm)
        
      if isinstance(attr, list):
        temp = dict()
        for key in attr:
          temp[key] = payload.get(key, None)
        return temp
        
      elif isinstance(attr, str):
        temp = dict()
        temp[attr] = payload.get(attr, None)
        return temp
      else:
        return payload
    except AssertionError as e:
      return dict( error=e )
    except jwt.esceptions.DecodeError as e:
      return dict( error=traceback.format_exc() )