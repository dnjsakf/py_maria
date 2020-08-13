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

@app.route("/security/login", methods=["GET","POST"])
def do_login():
  user = UserService.checkMatchPassword(**request.form)
    
  token = Token.make({
    "user": user
  })
  
  resp = make_response(redirect(url_for("index", success=True)))
  resp.set_cookie('access_token', value=token, expires=dt.nowTS(minutes=30), httponly=True)  
  
  return resp
  
@app.route("/security/logout", methods=["GET","POST"])
def do_logout():
  resp = make_response(redirect(url_for("index")))
  resp.set_cookie('access_token', value="", expires=0, httponly=True)
  
  return resp
  
@app.route("/security/register", methods=["GET"])
def index_register():
  return render_template("register.html", user=None)
  
@app.route("/security/register", methods=["POST"])
def do_register():
  inserted = UserService.insertUserInfo(request.form)

  return jsonify({
    "success": True, 
    "user": request.form,
    "messages": inserted,
  })