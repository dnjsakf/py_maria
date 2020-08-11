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

def check_login( func ):
  @wraps( func )
  def wrapper(*args, **kwargs):
    user = None
    try:
      token = request.cookies.get("access_token")
      
      if token is not None:      
        decoded_token = jwt.decode(token, app.secret_key, algorithm='HS256')
        
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