import os
import json

from flask import Flask, render_template, make_response, jsonify
from flask_cors import CORS

from .database.database import get_db, close_db
from .utils.security.token import Token

from .config.flask_config import Config

from flask import g

def create_app(*args, **kwargs):
  # Create Flask Application
  app = Flask(
    __name__,
    static_url_path=kwargs.get("static_url_path","/static/"),
    static_folder=kwargs.get("static_folder", "../public"),
    template_folder=kwargs.get("template_folder", "../public")
  )
  
  app.config.from_object(Config("development"))

  import pprint
  pprint.pprint( app.config )

  Token.init(
    secret_key=app.config.get("SECRET_KEY", None),
    expires=app.config.get("JWT_TOKEN_EXPIRES", 30)
  )

  with app.app_context():
    # Set Routes
    import app.routes as routes
    
    # Set CORS
    CORS(app=app, resources={
      r"*": { "origins": "*" }
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

  from flask import jsonify, make_response
  
  #@app.errorhandler(InvalidToken) # Security Only?
  #@app.errorhandler(Error.NotFoundUserError)
  #@app.errorhandler(Error.NoMatchedPasswordError)
  #def handle_dochi_error(e):
  #  app.logger.error(traceback.format_exc())
  #
  #  return redirect(url_for("index", success=False))
  
  @app.errorhandler(Marshmallow.ValidationError)
  def handle_mashmallow_error(e):
    app.logger.error(traceback.format_exc())
    
    resp = make_response(jsonify({
      "success": False,
      "message": str(e),
      "invalid": e.messages
    }))
  
    return resp
  
  @app.errorhandler(Error.DochiError)
  @app.errorhandler(Marshmallow.MarshmallowError)
  @app.errorhandler(JWT.PyJWTError)
  @app.errorhandler(MariaDB.Error)
  def handle_global_error(e):
    app.logger.error(traceback.format_exc())
    
    resp = make_response(jsonify({
      "success": False,
      "message": str(e)
    }))
    
    return resp