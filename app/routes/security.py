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
from app.decorators import check_token


@app.route("/security/signup", methods=["POST"])
def post_signup():
  inserted = UserService.insertUserInfo(request.form)

  resp = make_response(jsonify({
    "success": True,
    "inserted": inserted
  }))

  return resp

  
@app.route("/security/signin", methods=["POST"])
def do_signin():
  user = UserService.getSignedUser(
    user_id=request.form.get("user_id", None),
    user_pwd=request.form.get("user_pwd", None)
  )
  token = Token.make({ "user": user })
  
  resp = make_response(jsonify({
    "success": True,
    "message": None,
    "user": user,
    "access_token": token.decode()
  }))
  
  resp.headers["Content-Type"] = "application/json; charset=UTF-8;"
  resp.set_cookie("access_token", value=token, expires=dt.nowTS(minutes=30), httponly=True)
  
  return resp
    
    
@app.route("/security/signout", methods=["GET", "POST"])
@check_token(attr=["user"])
def do_signout(user=None, error=None):
  resp = make_response(jsonify({
    "success": user is not None,
    "access_token": None,
    "message": str(error) if error is not None else None,
  }))

  # Expire cookie
  resp.set_cookie("access_token", value="", expires=0, httponly=True)
  
  return resp

  
@app.route("/security/signcheck", methods=["POST"])
@check_token(attr=["user"])
def do_token_check(user=None, error=None):
  resp = make_response(jsonify({
    "success": user is not None,
    "user": user,
    "message": str(error) if error is not None else None,
  }))
  return resp
  
  
@app.route("/security/resign", methods=["POST"])
def post_resign():
  user = UserService.getSignedUser(
    user_id=request.form.get("user_id", None),
    user_pwd=request.form.get("user_pwd", None)
  )

  deleted = UserService.deleteUserInfo(user["user_id"])

  resp = make_response(jsonify({
    "success": True,
    "deleted": deleted,
    "access_token": None
  }))

  # Expire cookie
  resp.set_cookie("access_token", value="", expires=0, httponly=True)
  
  return resp

@app.route("/security/duplcheck", methods=["POST"])
def do_dupl_check():
  duplication = UserService.checkDuplication(
    user_id=request.form.get("user_id", None)
  )

  resp = make_response(jsonify({
    "success": True,
    "duplication": duplication
  }))
  
  return resp

@app.route("/security/edit", methods=["POST"])
def post_edit():
  user = UserService.checkMatchPassword(
    user_id=request.form.get("user_id", None),
    user_pwd=request.form.get("user_pwd", None)
  )
  
  updated, updated_user = UserService.updateUserInfo(form)
  token = Token.make({ "user": user })

  resp = make_response(jsonify({
    "success": True,
    "deleted": deleted,
    "access_token": None
  }))

  # Expire cookie
  resp.set_cookie("access_token", value="", expires=0, httponly=True)
  
  return resp