import inspect
import app.utils.datetime as dt

class BaseModel(object):
  def __init__(self, data=None):
    print( data )
  
    self.__reg_user = 'SYSTEM'
    self.__reg_dttm = dt.now().strftime("%Y%m%d%H%M%S")
  
    if data is not None:
      self.set_dict(data)
  
  def to_dict(self):
    attributes = inspect.getmembers(self.__class__, lambda a:not(inspect.isroutine(a)))
    
    data = dict()
    for ( key, value ) in attributes:
      if not(key.startswith('__') and key.endswith('__')):
        data[key] = getattr(self, key, None)
    
    return data

  def set_dict(self, data):
    if isinstance(data, dict):
      [ setattr(self, key, data[key] ) for key in data ]
      
  def validate(self):
    if self.required is not None:
      for key in self.required:
        if getattr(self, key) is None:
          return False
    return True

  @property
  def reg_user(self):
    return self.__reg_user

  @reg_user.setter
  def reg_user(self, reg_user):
    self.__reg_user = reg_user
      
  @property
  def reg_dttm(self):
    return self.__reg_dttm

  @reg_dttm.setter
  def reg_dttm(self, reg_dttm):
    self.__reg_dttm = reg_dttm
