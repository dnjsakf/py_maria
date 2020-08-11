from flask import (
  current_app as app,
  render_template
)

from app.utils.auth import check_login

@app.route("/", methods=["GET", "POST"])
@check_login
def index(user=None):
  return render_template("index.html", user=user)