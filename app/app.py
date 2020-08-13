import json
from flask import Flask, render_template, make_response, jsonify
from flask_cors import CORS

from .database.database import get_db, close_db
from .utils.security.token import Token

from flask import g

def create_app(*args, **kwargs):
  # Create Flask Application
  app = Flask(
    __name__,
    static_url_path=kwargs.get("static_url_path","/static/"),
    static_folder=kwargs.get("static_folder", "../public"),
    template_folder=kwargs.get("template_folder", "../public")
  )
  
  app.secret_key = "Dochi-MariaDB-Login"
  Token.secret_key = app.secret_key
  
  app.config["MARIADB_CONFIG"] = {
    "user": "DOCHI",
    "password": "dochi",
    "host": "127.0.0.1",
    "port": 3306,
    "database": "DOCHI"
  }
  
  with app.app_context():
    # Set Routes
    import app.routes as routes
    
    # Set CORS
    CORS(app=app, resources={
      r"*": {"origins": "*" }
    })
    
    # Set Context
    app.before_request(get_db)    
    app.teardown_appcontext(close_db)
    
    handle_errors(app)
    
    return app
    
def handle_errors(app):
  import traceback
  
  import mariadb as MariaDB
  import jwt.exceptions as JWT
  import marshmallow.exceptions as Marshmallow
  import app.exceptions as Error
  
  from cryptography.fernet import InvalidToken

  from flask import jsonify, redirect, url_for
  
  @app.errorhandler(InvalidToken) # Security Only?
  @app.errorhandler(Error.NotFoundUserError)
  @app.errorhandler(Error.NoMatchedPasswordError)
  def handle_dochi_error(e):
    app.logger.error(traceback.format_exc())
  
    return redirect(url_for("index", success=False))
  
  @app.errorhandler(Marshmallow.ValidationError)
  def handle_mashmallow_error(e):
    app.logger.error(traceback.format_exc())
  
    return jsonify({
      "valid": e.valid_data,
      "messages": e.messages,
      "message": str(e)
    })    
  
  @app.errorhandler(Error.DochiError)
  @app.errorhandler(Marshmallow.MarshmallowError)
  @app.errorhandler(JWT.PyJWTError)
  @app.errorhandler(MariaDB.Error)
  @app.errorhandler(Exception)
  def handle_global_error(e):
    app.logger.error(traceback.format_exc())
    
    return jsonify({
      "message": str(e)
    })