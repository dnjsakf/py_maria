from .index import app as route_index
from .security import app as route_security

from flask import current_app as app

@app.route("/ping", methods=["GET"])
def ping():
  return "pong"