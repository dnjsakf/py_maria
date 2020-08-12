from flask import g
from app.database.database import with_db
from app.database.models import UserSchema
from app.utils.encrypt import Encrypt

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
   
  @classmethod
  @with_db
  def insertUserInfo(cls, db, user:dict) -> int:
    columns = []
    values = []
    for key, val in user.items():
      columns.append(key.upper())
      values.append(val)

    sql = '''INSERT INTO DOCHI.AT_USER ( {columns} ) VALUES ( {values} )'''.format(
      columns=", ".join(columns),
      values=", ".join([ "?" for _ in range(0, len(columns))])
    )

    try:
      inserted = db.insert_one( sql, *values)
    except Exception as e:
      raise e

    return inserted

  @classmethod
  def checkMatchPassword(cls, user_id=None, user_pwd=None, **kwargs):
    assert user_id is not None, "No 'user_id'"
    assert user_pwd is not None, "No 'user_pwd"

    matched = False
    user = cls.getUserInfo(user_id)
    if "user_pwd" in user:
      matched = user is not None and Encrypt.compare(user_pwd, user["user_pwd"])

      if matched == True:
        user.pop("user_pwd")

    return ( matched, user )