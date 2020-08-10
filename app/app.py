import json
from flask import Flask, render_template, make_response, jsonify
from flask_cors import CORS
from .database.database import get_db, close_db

from flask import g

def create_app(*args, **kwargs):
  # Create Flask Application
  app = Flask(
    __name__,
    static_url_path=kwargs.get("static_url_path","/static/"),
    static_folder=kwargs.get("static_folder", "../public"),
    template_folder=kwargs.get("template_folder", "../public")
  )
  
  app.config["secret_key"] = "Dochi-MariaDB-Login"
  app.config["MARIADB_CONFIG"] = {
    "user": "DOCHI",
    "password": "dochi",
    "host": "127.0.0.1",
    "port": 3306,
    "database": "DOCHI"
  }
  
  with app.app_context():
    # Set Routes
    from .routes import route_index
    
    # Set CORS
    CORS(app=app, resources={
      r"*": {"origins": "*" }
    })
    
    # Set Context
    app.before_request(get_db)    
    app.teardown_appcontext(close_db)
      
    return app
    
    