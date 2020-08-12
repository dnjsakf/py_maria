import app.utils.datetime as dt

from app.utils.encrypt import Encrypt
from app.database.database import with_maria

from marshmallow import Schema, fields, validate, pprint
from marshmallow.exceptions import ValidationError
from marshmallow.decorators import validates, validates_schema, pre_dump, post_load

db_config = {
  "user": "DOCHI",
  "password": "dochi",
  "host": "127.0.0.1",
  "port": 3306,
  "database": "DOCHI"
}

class BaseSchema(Schema):
  reg_user = fields.Str(
    #default="SYSTEM", # Serializing
    missing="SYSTEM", # Deserializing
    validate=validate.Length(max=50)
  )
  reg_dttm = fields.Str(
    #default=dt.now().strftime("%Y%m%d%H%M%S"), # serializing
    missing=dt.now().strftime("%Y%m%d%H%M%S"), # deserializing
    validate=validate.Length(max=14)
  )
  
  def setData(self, data):
    try:
      return ( True, self.load(data), None )
    except ValidationError as e:
      return ( False, None, e.messages )
  
  def getData(self, *args, **kwargs):
    pass

class AuthSchema(BaseSchema):
  id = fields.Str(required=True, validate=validate.Length(max=50))
  name = fields.Str(required=True, validate=validate.Length(max=50))
  
class User(object):
  def __init__(self, **kwargs):
    [ setattr(self, key, val) for key, val in kwargs.items() ]

  def __repr__(self):
    return "<User(name={self.name!r})>".format(self=self)

class UserSchema(BaseSchema):
  class Meta:
    unknown = "include"
        
  id = fields.Str(required=True, validate=validate.Length(max=50))
  pwd = fields.Str(required=True)
  name = fields.Str(required=True, validate=validate.Length(max=50))
  nick = fields.Str(validate=validate.Length(max=50))
  email = fields.Email(validate=validate.Length(max=100))
  cell_phone = fields.Str(validate=validate.Length(max=20))
  
  auth = fields.Nested(AuthSchema(many=True))
  
  @with_maria(db_config)
  def getData(self, db, id):
    data = db.select_one('''
    SELECT T1.USER_ID    AS ID
         , T1.USER_PWD   AS PWD
         , T1.USER_NAME  AS NAME
         , T1.USER_NICK  AS NICK
         , T1.EMAIL
         , T1.CELL_PHONE
      FROM DOCHI.AT_USER T1
     WHERE 1=1
       AND T1.USER_ID = %s  
    ''', id)
    
    if data is not None:
      return self.dump(data)
  
  # Called, load(s)
  @validates("pwd")
  def validate_pwd(self, value):
    print("="*15, "validate_pwd", "="*15)
    pprint({
      "data": value
    }, indent=2 )
    size, min, max = ( len(value), 4, 100 )
    
    if min > size or size > max:
      raise ValidationError("Length must be between %d and %d." % ( min, max ))
  
  # Called, load(s)
  @validates_schema
  def validate(self, data, **kwargs):
    print("="*15, "validate", "="*15)
    pprint({
      "data": data,
      "kwargs": kwargs
    }, indent=2 )
    
    pwd = data.get("pwd", None)
    pwd_chk = data.get("pwd_chk", None)
    if pwd_chk is not None and pwd != pwd_chk:
      raise ValidationError("Not matched password.")
      
  @pre_dump(pass_many=False)
  def serializing(self, data, **kwargs):
    print("="*15, "pre_dump", "="*15)
    pprint({
      "data": data,
      "kwargs": kwargs
    }, indent=2 )
      
    return data
    
  @post_load(pass_many=False)
  def deserializing(self, data, **kwargs):
    print("="*15, "post_load", "="*15)
    pprint({
      "data": data,
      "kwargs": kwargs
    }, indent=2 )
    
    pwd = data.get("pwd", None)
    if pwd is not None:
      data["pwd"] = Encrypt.encrypt(pwd)
      
    return data

'''
  Deserializing
'''
user = UserSchema(many=False).setData(dict(
  id="user01",
  pwd="user01",
  pwd_chk="user01",
  name="user01",
  nick=u"사용자"
))
pprint( user, indent=2 )

auth = AuthSchema(many=True).setData([
  dict(id="0", name="public")
])
pprint( auth, indent=2 )

'''
  Serializing
'''
#user = UserSchema(many=False).dump(dict(
#  id="user01",
#  pwd="gAAAAABfM54C8ck3r-XkpYD-iLH2Teg0hHrMFhpMtffBazvc5Nu-X23RESECp0xTwZABM-OvxZVLTOcGDG-PErfb-Y97n4KvMw==",
#  name="user01",
#  nick=u"사용자"
#))
#pprint( user, indent=2 )
#
#auth = AuthSchema(many=True).dump([
#  dict(id="0", name="public")
#])
#pprint( auth, indent=2 )

schema = UserSchema(many=False)
user = schema.getData(id="admin")
pprint( user, indent=2 )

