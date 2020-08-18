from pprint import pprint

from app.database.models import BaseSchema
from app.utils.security.encrypt import Encrypt

from marshmallow import fields, validate
from marshmallow.decorators import validates, validates_schema, pre_dump, post_load
from marshmallow.exceptions import ValidationError

class UserSchema(BaseSchema):
  class Meta:
    unknown = "include"
        
  user_id = fields.Str(required=True, validate=validate.Length(min=4, max=50))
  user_pwd = fields.Str(required=True)
  user_name = fields.Str(required=True, validate=validate.Length(min=1, max=50))
  user_nick = fields.Str(validate=validate.Length(max=50))
  email = fields.Str()
  cell_phone = fields.Str(validate=validate.Length(max=20))
  
  @validates("user_pwd")
  def validate_user_pwd(self, value):
    print("="*15, "validate_user_pwd", "="*15)
    pprint({ "data": value }, indent=2 )
    size, min, max = ( len(value), 4, 100 )
    
    if min > size or size > max:
      raise ValidationError("Length must be between %d and %d." % ( min, max ))

  @validates("email")
  def validate_email(self, value):
    print("="*15, "validate_email", "="*15)
    pprint({ "data": value }, indent=2 )
    size, max = ( len(value), 100 )
  
    if size > max:
      raise ValidationError("Length must be less than %d." % ( max ))
      
    if size > 0:
      validate.Email()(value)

  @validates_schema
  def validate(self, data, **kwargs):
    print("="*15, "validate", "="*15)
    pprint({
      "data": data,
      "kwargs": kwargs
    }, indent=2 )
    
    user_pwd = data.get("user_pwd", None)
    user_pwd_chk = data.get("user_pwd_chk", None)
    if user_pwd_chk is not None and user_pwd != user_pwd_chk:
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
    
    if "user_pwd" in data:
      data["user_pwd"] = Encrypt.encrypt(data["user_pwd"])

    if "user_pwd_chk" in data:
      data.pop("user_pwd_chk")
      
    return data
