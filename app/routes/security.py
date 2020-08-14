import json
import traceback

from flask import (
  current_app as app,
  make_response,
  render_template,
  jsonify,
  request,
  url_for,
  redirect
)

from app.utils.time import datetime as dt
from app.utils.security.token import Token
from app.database.service.user import UserService
from app.decorators import with_cookies, check_token

from app import exceptions
from marshmallow.exceptions import ValidationError

@app.route("/security/check", methods=["POST"])
@check_token(attr=["user"])
def to_token_check(user=None, error=None):
  resp = make_response(jsonify({
    "success": user is not None, 
    "user": user,
    "messages": str(error),
  }))
  return resp

@app.route("/security/register", methods=["POST"])
def post_register():
  inserted = UserService.insertUserInfo(request.form)

  resp = make_response(jsonify({
    "success": True, 
    "user": request.form,
    "messages": inserted,
  }))

  return resp

@app.route("/security/login", methods=["POST"])
def do_login():
  user = UserService.checkMatchPassword(**request.form)
  token = Token.make({ "user": user })
  
  resp = make_response(jsonify({
    "success": True,
    "message": None,
    "user": user,
    "access_token": token.decode()
  }))
  resp.headers["Content-Type"] = "application/json; charset=UTF-8;"
  
  #resp = make_response(redirect(url_for("index", success=True)))
  #resp.set_cookie('access_token', value=token, expires=dt.nowTS(minutes=30), httponly=True)
  
  return resp
    
@app.route("/security/logout", methods=["GET", "POST"])
def do_logout():
  resp = make_response(jsonify({
    "success": True
  }))

  #resp = make_response(redirect(url_for("index")))
  resp.set_cookie('access_token', value="", expires=0, httponly=True)
  
  return resp