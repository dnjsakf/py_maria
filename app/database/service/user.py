from flask import g
from app.database.database import with_db
from app.database.models import UserModel
from app.utils.encrypt import Encrypt

from .base import BaseService

class UserService(BaseService):
  @classmethod
  @with_db
  def getUserInfo(cls, db, user_id) -> UserModel:
    data = db.select_one('''
      SELECT T1.USER_ID
           , T1.USER_NAME
           , T1.USER_PWD
           , T1.USER_NICK
           , T2.AUTH_ID
           , T1.REG_USER
           , T1.REG_DTTM
        FROM DOCHI.AT_USER T1
        LEFT OUTER JOIN DOCHI.AT_USER_AUTH_MAP T2
          ON T2.USER_ID = T1.USER_ID
         AND T2.IS_MAJOR = 'Y'
       WHERE 1=1
         AND T1.USER_ID = ?
    ''', user_id )

    if data is not None:
      return UserModel(data)
   
  @classmethod
  @with_db
  def insertUserInfo(cls, db, user:UserModel):
    cur = db.insert_one('''
      INSERT INTO DOCHI.AT_USER (
        USER_ID, USER_PWD, USER_NAME
        , USER_NICK, EMAIL, CELL_PHONE
        , REG_USER, REG_DTTM
      ) VALUES (
        ?, ?, ?
        , ?, ?, ?
        , ?, ?
      )
    ''',
    user.user_id, user.user_pwd, user.user_name
    , user.user_nick, user.email, user.cell_phone
    , user.reg_user, user.reg_dttm
    )
    
    print( dir(cur) )

  @classmethod
  def checkMatchPassword(cls, user_id, user_pwd):
    matched = False
    user = cls.getUserInfo(user_id)

    if user is not None:
      matched = Encrypt.compare(user_pwd, user.user_pwd)

    return ( matched, user )