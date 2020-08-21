import os

from flask import Flask
from flask_cors import CORS

from .config.flask_config import Config
from .utils.security.encrypt import Encrypt
from .utils.security.token import Token
from .database.database import MariaDB


def initialize(config):
  Encrypt.init(
    keyfile=config.get("ENCRYPT_KEY_FILE", None)
  )
  Token.init(
    secret_key=config.get("SECRET_KEY", None),
    expires=config.get("JWT_TOKEN_EXPIRES", 30)
  )
  MariaDB.init(**config.get("MARIADB_CONFIG"))


def handle_request():
  from flask import current_app as app, g, url_for, request
    
  @app.context_processor
  def override_url_for():
    app.logger.info("context_processor")
    return dict(url_for=dated_url_for)

  def dated_url_for(endpoint, **values):
    if endpoint == "static":
      filename = values.get('filename', None)
      if filename:
        file_path = os.path.join(app.static_folder, filename)
        values['q'] = int(os.stat(file_path).st_mtime)
    return url_for(endpoint, **values)
  
  @app.before_request
  def get_db(error=None):
    app.logger.info("before_request")
    if request.endpoint != "static":
      if "db" not in g:
        g.db = MariaDB.get_db()
  
  @app.teardown_appcontext
  def close_db(error=None, *args, **kwargs):
    app.logger.info("teardown_appcontext")
    db = g.pop('db', None)
    if db is not None:
      db.close()

def handle_errors():
  from flask import current_app as app
  
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

def create_app(*args, **kwargs):
  # Create Flask Application
  app = Flask(
    __name__,
    static_url_path=kwargs.get("static_url_path","/static/"),
    static_folder=kwargs.get("static_folder", "../public"),
    template_folder=kwargs.get("template_folder", "../public")
  )
  
  config = Config("development").to_dict()
  app.secret_key = config.get("SECRET_KEY", None)
  
  app.config.from_object(config)
  
  initialize(config)

  with app.app_context():
    # Set Routes
    import app.routes as routes
    
    # Set CORS
    CORS(app=app, resources={
      r"*": { "origins": "*" }
    })
    
    # Set Request Handlers
    handle_request()
    
    # Set Error Handlers
    handle_errors()
    
    return app