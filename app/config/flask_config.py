import inspect
from pprint import pprint

class Field(object):
  @classmethod
  def class_to_dict(cls, __cls, override=dict()):
    data = dict()
    meta = cls.getMeta(__cls, {})
    attrs = inspect.getmembers(__cls, lambda item:not(inspect.isroutine(item)))

    # Set Exnteds
    if meta.get("extends", None) is not None:
      for extend in meta.get("extends", []):
        data.update(cls.class_to_dict(extend))

    # Set Prefix
    prefix = None
    if meta.get("prefix", None) is not None:
      prefix = meta.get("prefix", cls.__name__)

    # Class to dict
    for ( key, value ) in attrs:
      if not(key.startswith('__') and key.endswith('__')):
        key = "{}_{}".format(prefix, key) if prefix is not None else key

        # Unpacking classes
        if inspect.isclass( value ):
          # data[key] = cls.class_to_dict(value)
          continue
        else:
          data[key] = value

    # Override Data
    if isinstance(override, dict): 
      data.update( override )

    return data
  
  @classmethod
  def getMeta(cls, __cls, default=None, **kwargs):
    Meta = getattr(__cls, "Meta", None)

    if Meta is not None:
      return cls.class_to_dict(Meta, kwargs)

    return default

  @classmethod
  def dict(cls, __cls, **kwargs):
    return cls.class_to_dict(__cls, kwargs)

'''
  Database Configurations
'''
class MariaDBConfig(object):
  class Meta:
    mode = "development"
    
  host = "127.0.0.1"
  port = 3306
  database = "DOCHI"
  user = "DOCHI"
  password = "dochi"


'''
  JWT Configurations
'''
class TokenConfig(object):
  class Meta:
    mode = "development"
    prefix = "JWT_TOKEN"
  
  SUBJECT = "DochiLoginToken"
  EXPIRES = 5 # Minutes
  
'''
  Encrypt Configurations
'''
class EncryptConfig(object):
  class Meta:
    mode = "development"
    prefix = "ENCRYPT"
  
  KEY_FILE = "app/config/key.key"

'''
  Flask Configurations
'''
class FlaskConfig(object):
  class Meta:
    mode = "development"
    extends = [
      TokenConfig,
      EncryptConfig
    ]

  SECRET_KEY = "Dochi-MariaDB-Login"
  MARIADB_CONFIG = Field.dict(MariaDBConfig)

  
'''
  Integrated Configuration.
'''
class Config(object):
  def __init__(self, mode="production", *args, **kwargs):
    for key, item in self.to_dict().items():
      setattr(self, key, item)
      
  def to_dict(self):
    data = Field.dict(FlaskConfig)
    if data is None:
      return dict()
    return data