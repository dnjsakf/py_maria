from flask import (
  current_app as app,
  render_template
)

from app.decorators import with_cookies, check_token

@app.route("/", methods=["GET", "POST"])
@with_cookies(attr="access_token")
@check_token(attr=["user", "error"])
def index(user=None, exp=None, access_token=None, error=None):
  if error is not None:
    app.logger.error( error )
    
  return render_template("index.html", user=user)
