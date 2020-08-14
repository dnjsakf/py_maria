from flask import g

from marshmallow.exceptions import ValidationError

from app.database.database import with_db
from app.database.models import UserSchema
from app.utils.security.encrypt import Encrypt
from app.exceptions import NotFoundUserError, NoMatchedPasswordError, EmptyDataError

from .base import BaseService

class UserService(BaseService):
  @classmethod
  @with_db
  def getUserInfo(cls, db, user_id) -> dict:
    data = db.select_one('''
      SELECT T1.USER_ID
           , T1.USER_NAME
           , T1.USER_PWD
           , T1.USER_NICK
           , T1.EMAIL
           , T1.CELL_PHONE
           , T1.REG_USER
           , T1.REG_DTTM
        FROM DOCHI.AT_USER T1
       WHERE 1=1
         AND T1.USER_ID = ?
    ''', user_id )
  
    if data is not None:
      return UserSchema().dump(data)
        
    raise NotFoundUserError
   
  @classmethod
  @with_db
  def insertUserInfo(cls, db, data:dict) -> int:
    user = UserSchema().load(data)
  
    columns = []
    values = []
    for key, val in user.items():
      columns.append(key.upper())
      values.append(val)

    sql = '''INSERT INTO DOCHI.AT_USER ( {columns} ) VALUES ( {values} )'''.format(
      columns=", ".join(columns),
      values=", ".join([ "?" for _ in range(0, len(columns))])
    )

    return db.insert_one(sql, *values)

  @classmethod
  def checkMatchPassword(cls, user_id=None, user_pwd=None, **kwargs):
    if user_id is None or user_id == "": raise EmptyDataError("Empty 'user_id'")
    if user_pwd is None or user_pwd == "": raise EmptyDataError("Empty 'user_pwd'")
      
    user = cls.getUserInfo(user_id)
    
    if Encrypt.compare(user_pwd, user["user_pwd"]) == True:
      user.pop("user_pwd")
      return user
      
    raise NoMatchedPasswordError("No matched password. ")
