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

import app.utils.datetime as dt
from app.utils.auth import make_token
from app.utils.encrypt import Encrypt
from app.database.models.user import UserSchema
from app.database.service.user import UserService


@app.route("/auth/login", methods=["GET","POST"])
def do_login():
  try:
    matched, user = UserService.checkMatchPassword(**request.form)

    if matched == False or user is None:
      return redirect(url_for("index", success=False))
      
    token = make_token({
      "user": user
    })
    
    resp = make_response(redirect(url_for("index", success=True)))
    resp.set_cookie('access_token', value=token, expires=dt.nowTS(minutes=30), httponly=True)  
    
    return resp
  except Exception as e:
    traceback.print_exc()
    resp = make_response(redirect(url_for("index", success=False, code=500)))
    return resp

  
@app.route("/auth/logout", methods=["GET","POST"])
def do_logout():
  resp = make_response(redirect(url_for("index")))
  resp.set_cookie('access_token', value="", expires=0, httponly=True)
  return resp
  
@app.route("/auth/register", methods=["GET"])
def index_register():
  resp = make_response(render_template("register.html", user=None))
  return resp
  
@app.route("/auth/register", methods=["POST"])
def do_register():
  try:
    valid, user, messages = UserSchema().setData(request.form)
    if valid == False:
      return make_response(jsonify({
        "success": False, 
        "user": user ,
        "messages": messages
      }))

    inserted = UserService.insertUserInfo(user)
    return make_response(jsonify({
      "success": True, 
      "user": user ,
      "messages": inserted,
    }))
  except Exception as e:
    traceback.print_exc()
    return make_response(jsonify({
      "success": False, 
      "user": None,
      "messages": str(e),
    }))

