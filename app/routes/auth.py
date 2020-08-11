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
from app.database.models.user import UserModel
from app.database.service.user import UserService


@app.route("/auth/login", methods=["GET","POST"])
def do_login():
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
  
  resp = make_response(redirect(url_for("index", success=True)))
  resp.set_cookie('access_token', value=token, expires=dt.nowTS(minutes=30), httponly=True)  
  
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
  user = UserModel(request.form)
  valid = user.validate()
  
  if valid == False:
    resp = make_response(jsonify({"success": valid, "user": user.to_dict() }))
    return resp

  res = UserService.insertUserInfo(user)
  
  print( res )
  
  resp = make_response(jsonify({"success": valid, "user": user.to_dict() }))
  return resp

