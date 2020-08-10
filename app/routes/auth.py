import jwt
import traceback

from datetime import datetime, timedelta, timezone

from flask import (
  current_app as app,
  make_response,
  request,
  redirect,
  url_for
)

from app.utils.datetime import getNow
from app.database.service.user import UserService

def make_token(data):
  secret_key = app.config["secret_key"]
  expires = getNow(minutes=30)

  payload = {
    "sub": request.host
    , "iss": "jwt_tester"
    , "exp": datetime.timestamp(expires)
  }
  
  if isinstance(data, dict):
    payload.update(data)
  
  return jwt.encode(payload, secret_key, algorithm='HS256')

@app.route("/auth/login", methods=["POST"])
def do_login():
  print( 'json', request.json )
  user_id = request.form.get("user_id", None)
  user_pwd = request.form.get("user_pwd", None)

  matched, user = UserService.checkMatchPassword(user_id, user_pwd)
  
  if matched == False or user is None:
    return redirect(url_for("index", success=False))
    
  token = make_token({
    "user": {
      "name": user.user_name,
      "nick": user.user_nick,
      "auth": user.auth_id
    }
  })

  expires = datetime.timestamp(getNow(minutes=30))
  
  resp = make_response(redirect(url_for("index", success=True)))
  resp.set_cookie('access_token', value=token, expires=expires, httponly=True)  
  
  return resp
  
@app.route("/auth/logout", methods=["GET", "POST"])
def do_logout():
  resp = make_response(redirect(url_for("index")))
  resp.set_cookie('access_token', value="", expires=0, httponly=True)
  return resp