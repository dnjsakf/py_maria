from .base import BaseModel
from app.utils.encrypt import Encrypt

class UserModel(BaseModel):
  def __init__(self, data=None):
    super().__init__(data=data)
    
    self.required = [
      "user_id",
      "user_pwd",
      "user_name"
    ]

  @property
  def user_id(self):
    return self.__user_id

  @user_id.setter
  def user_id(self, user_id):
    self.__user_id = user_id

  @property
  def user_pwd(self):
    return self.__user_pwd

  @user_pwd.setter
  def user_pwd(self, user_pwd):
    self.__user_pwd = Encrypt.encrypt(user_pwd)

  @property
  def user_name(self):
    return self.__user_name

  @user_name.setter
  def user_name(self, user_name):
    self.__user_name = user_name

  @property
  def user_nick(self):
    return self.__user_nick

  @user_nick.setter
  def user_nick(self, user_nick):
    self.__user_nick = user_nick

  @property
  def email(self):
    return self.__email

  @email.setter
  def email(self, email):
    self.__email = email

  @property
  def cell_phone(self):
    return self.__cell_phone

  @cell_phone.setter
  def cell_phone(self, cell_phone):
    self.__cell_phone = cell_phone
