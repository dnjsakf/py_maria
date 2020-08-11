import jwt
import traceback

from flask import (
  current_app as app,
  make_response,
  request,
  redirect,
  url_for
)

import app.utils.datetime as dt
from app.database.service.user import UserService

def make_token(data):
  payload = {
    "sub": request.host
    , "iss": "jwt_tester"
    , "exp": dt.nowTS(minutes=30)
  }
  
  if isinstance(data, dict):
    payload.update(data)
  
  return jwt.encode(payload, app.secret_key, algorithm='HS256')

@app.route("/auth/login", methods=["POST"])
def do_login():
  print( 'json', request.json )
  user_id = request.form.get("user_id", None)
  user_pwd = request.form.get("user_pwd", None)

  matched, user = UserService.checkMatchPassword(user_id, user_pwd)
  
  print( user.to_dict() )
  
  if matched == False or user is None:
    return redirect(url_for("index", success=False))
    
  token = make_token({
    "user": {
      "name": user.user_name,
      "nick": user.user_nick,
      "auth": user.auth_id
    }
  })
  
  resp = make_response(redirect(url_for("index", success=True)))
  resp.set_cookie('access_token', value=token, expires=dt.nowTS(minutes=30), httponly=True)  
  
  return resp
  
@app.route("/auth/logout", methods=["GET", "POST"])
def do_logout():
  resp = make_response(redirect(url_for("index")))
  resp.set_cookie('access_token', value="", expires=0, httponly=True)
  return resp