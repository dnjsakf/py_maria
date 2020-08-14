import os
from flask import (
  current_app as app,
  send_file
)

from app.decorators import with_cookies, check_token

@app.route("/", methods=["GET", "POST"])
@check_token(attr=["user"])
def index(user=None, error=None):
  #return render_template("index.html", user=user)
  return send_file(os.path.join(app.static_folder, "index.html"))

'''
@app.route("/", methods=["GET", "POST"])
@with_cookies(attr="access_token")
@check_token(attr=["user", "error"])
def index(user=None, exp=None, access_token=None, error=None):
  if error is not None:
    app.logger.error( error )
  
  return render_template("index.html", user=user)
'''