from flask import (
  current_app as app,
  render_template
)

from app.decorators import with_cookies, check_token

@app.route("/", methods=["GET", "POST"])
@app.route("/<path:path>", methods=["GET", "POST"])
@check_token(attr=["user"])
def index(path=None, user=None, error=None):
  print( 'Hi index' );
  return render_template("index.html")
