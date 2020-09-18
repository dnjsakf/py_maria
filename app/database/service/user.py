import json

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
  def selectUserInfo(cls, db, user_id) -> dict:
    selected = db.select_one('''
      SELECT T1.USER_ID
           , T1.USER_NAME
           , T1.USER_NICK
           , T1.USER_EMAIL
           , T1.USER_MOBILE
           , T1.REG_USER
           , T1.REG_DTTM
        FROM DOCHI.AT_USER T1
       WHERE 1=1
         AND T1.USER_ID = ?
    ''', (user_id, ))
  
    if selected is None:
      raise NotFoundUserError
        
    return selected
   
  @classmethod
  @with_db
  def insertUserInfo(cls, db, data:dict) -> int:
    user = UserSchema().load(data)
    
    columns = []
    prepared = []
    values = []
    
    for key, val in user.items():
      columns.append( key.upper() )
      prepared.append( "?" )
      values.append( val )
    
    sql = '''
    INSERT INTO DOCHI.AT_USER ( 
      %s
    ) VALUES ( 
      %s
    )
    ''' % (
      ",".join( columns ), 
      ",".join( prepared )
    )

    return db.insert_one(sql, values)
    
  @classmethod
  @with_db
  def updateUserInfo(cls, db, data:dict) -> int:
    user = UserSchema().load(data)
    
    prepared = []
    values = []
    conds = [ user.pop("user_id", None) ]
    
    for key, val in user.items():
      prepared.append( key.upper()+" = ?" )
      values.append( val )
        
    sql = '''
    UPDATE DOCHI.AT_USER
       SET %s
     WHERE 1=1
       AND USER_ID = ?
    ''' % ( 
      ", ".join( prepared )
    )
    
    return db.update_one(sql, values, conds)
    
  @classmethod
  @with_db
  def deleteUserInfo(cls, db, user_id:str) -> int:
    return db.delete_one('''
    DELETE FROM DOCHI.AT_USER
     WHERE 1=1
       AND USER_ID = ?
    ''', (user_id, ))

  @classmethod
  @with_db
  def getSignedUser(cls, db, user_id, user_pw) -> dict:
    if user_id is None or user_id == "": raise EmptyDataError("Empty 'user_id'")
    if user_pw is None or user_pw == "": raise EmptyDataError("Empty 'user_pw'")
    
    selected = db.select_one('''
      SELECT T1.USER_PW
        FROM DOCHI.AT_USER T1
       WHERE 1=1
         AND T1.USER_ID = ?
    ''', (user_id, ))
  
    if selected is None:
      raise NotFoundUserError
      
    if Encrypt.compare(user_pw, selected["user_pw"]) == False:
      raise NoMatchedPasswordError("No matched password. ")

    selected_user = cls.selectUserInfo(user_id)
    user = UserSchema().dumps(selected_user)

    return json.loads( user )

  @classmethod
  @with_db
  def checkDuplication(cls, db, user_id) -> bool:
    try:
      return cls.selectUserInfo(user_id) is not None
    except NotFoundUserError as e:
      return False
    except Exception as e:
      return True