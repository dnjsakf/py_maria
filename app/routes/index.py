from flask import (
  current_app as app,
  render_template
)

from app.decorators import with_cookies, check_token

@app.route("/", methods=["GET", "POST"])
@check_token(attr=["user"])
def index(user=None, error=None):
  return render_template("index.html")
