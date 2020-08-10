from flask import g
from app.database.models import UserModel
from app.utils.encrypt import Encrypt

class UserService(object):
  @classmethod
  def getUserInfo(cls, user_id) -> UserModel:
    db = g.get('db', None)
    if db is not None:
      data = db.select_one('''
        SELECT T1.USER_ID
            , T1.USER_NAME
            , T1.USER_PWD
            , T1.USER_NICK
            , T2.AUTH_ID
          FROM DOCHI.AT_USER T1
          LEFT OUTER JOIN DOCHI.AT_USER_AUTH_MAP T2
            ON T2.USER_ID = T1.USER_ID
          AND T2.IS_MAJOR = 'Y'
        WHERE 1=1
          AND T1.USER_ID = ?
      ''', user_id )

      if data is not None:
        return UserModel(data)

    return None

  @classmethod
  def checkMatchPassword(cls, user_id, user_pwd):
    matched = False
    user = cls.getUserInfo(user_id)

    if user is not None:
      matched = Encrypt.compare(user_pwd, user.user_pwd)

    return ( matched, user )