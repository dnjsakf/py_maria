import inspect
from app.utils.encrypt import Encrypt

class BaseModel(object):
  def __init__(self, data=None):
    if data is not None:
      self.set_dict(data)
  
  def to_dict(self):
    attributes = inspect.getmembers(self.__class__, lambda a:not(inspect.isroutine(a)))
    
    temp = dict()
    for ( key, value ) in attributes:
      if not(key.startswith('__') and key.endswith('__')):
        temp[key] = getattr(self, key, None)
    return temp

  def set_dict(self, data):
    if isinstance(data, dict):
      [ setattr(self, key, data[key] ) for key in data ]

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


class UserModel(BaseModel):
  @property
  def user_id(self):
    return self.__user_id

  @user_id.setter
  def user_id(self, user_id):
    self.__user_id = user_id

  @property
  def user_name(self):
    return self.__user_name

  @user_name.setter
  def user_name(self, user_name):
    self.__user_name = user_name

  @property
  def user_pwd(self):
    return self.__user_pwd

  @user_pwd.setter
  def user_pwd(self, user_pwd):
    self.__user_pwd = Encrypt.decrypt(user_pwd.encode("utf-8")).decode("utf-8")

  @property
  def user_nick(self):
    return self.__user_nick

  @user_nick.setter
  def user_nick(self, user_nick):
    self.__user_nick = user_nick


