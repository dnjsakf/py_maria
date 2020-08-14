import os
from flask import (
  current_app as app,
  url_for,
  render_template
)

from app.decorators import with_cookies, check_token

@app.route("/", methods=["GET", "POST"])
@check_token(attr=["user"])
def index(user=None, error=None):
  return render_template("index.html")

@app.context_processor
def override_url_for():
  return dict(url_for=dated_url_for)

def dated_url_for(endpoint, **values):
  if endpoint == 'static':
    filename = values.get('filename', None)
    if filename:
      file_path = os.path.join(app.static_folder, filename)
      values['q'] = int(os.stat(file_path).st_mtime)
  return url_for(endpoint, **values)

'''
@app.route("/", methods=["GET", "POST"])
@with_cookies(attr="access_token")
@check_token(attr=["user", "error"])
def index(user=None, exp=None, access_token=None, error=None):
  if error is not None:
    app.logger.error( error )
  
  return render_template("index.html", user=user)
'''