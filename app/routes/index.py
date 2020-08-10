import jwt
import traceback

from functools import wraps
from datetime import datetime, timedelta

from flask import (
  current_app as app,
  render_template,
  make_response,
  jsonify,
  request,
  redirect,
  url_for,
  g
)

from app.utils.encrypt import Encrypt

def make_token(data):
  secret_key = app.config["secret_key"]
  expires = int(datetime.timestamp(datetime.utcnow()+timedelta(hours=24)))
  
  payload = {
    "sub": request.host
    , "iss": "jwt_tester"
    , "exp": expires
  }
  
  if isinstance(data, dict):
    payload.update(data)
  
  token = jwt.encode(payload, secret_key, algorithm='HS256')
  
  return ( token, expires )
  


def check_login( func ):
  @wraps( func )
  def wrapper(*args, **kwargs):
    user = None
    try:
      secret_key = app.config["secret_key"]
      token = request.cookies.get("access_token")
      
      if token is not None:      
        decoded_token = jwt.decode(token, secret_key, algorithm='HS256')
        
        print( decoded_token )
        
        user = decoded_token.get("user", None)
    except Exception as e:
      traceback.print_exc()
    finally:
      return func(user, *args, **kwargs)
  return wrapper


@app.route("/", methods=["GET", "POST"])
@check_login
def index(user=None):
  return render_template("index.html", user=user)

@app.route("/login", methods=["POST"])
def do_login():
  user_id = request.form.get("user_id", None)
  user_pwd = request.form.get("user_pwd", None)
  
  db = g.get('db', None)
  data = db.select_one('''
    SELECT T1.USER_ID
         , T1.USER_NAME
         , T1.USER_PWD
         , T1.USER_NICK
         , T2.AUTH_ID
      FROM DOCHI.AT_USER T1
      LEFT OUTER JOIN DOCHI.AT_USER_AUTH_MAP T2
        ON T2.USER_ID = T1.USER_ID
       AND T2.IS_MAJOR = 'Y'
     WHERE 1=1
       AND T1.USER_ID = ?
  ''', user_id )
  
  matched = False
  if data is not None:
    matched = Encrypt.compare(user_pwd, data.get("user_pwd"))
  
  if matched == False:
    return redirect(url_for("index"))
    
  token, expires = make_token({
    "user": {
      "name": data.get("user_name"),
      "nick": data.get("user_nick"),
      "auth": data.get("auth_id")
    }
  })
  
  print( expires )
  
  resp = make_response(redirect(url_for("index")))
  resp.set_cookie('access_token', value=token, expires=expires, httponly=True)  
  
  return resp
  
@app.route("/logout", methods=["GET", "POST"])
def do_logout():
  resp = make_response(redirect(url_for("index")))
  resp.set_cookie('access_token', value="", expires=0, httponly=True)
  return resp