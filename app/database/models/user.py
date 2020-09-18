from pprint import pprint

from app.database.models import BaseSchema
from app.utils.security.encrypt import Encrypt

from marshmallow import fields, validate
from marshmallow.decorators import validates, validates_schema, pre_dump, post_load
from marshmallow.exceptions import ValidationError

class UserSchema(BaseSchema):
  class Meta:
    unknown = "include"
        
  user_id = fields.Str(
    data_key="id",
    required=True,
    validate=validate.Length(min=4, max=50)
  )
  user_pw = fields.Str(
    data_key="password",
    required=True
  )
  user_pw_chk = fields.Str(
    data_key="password_chk"
  )
  user_name = fields.Str(
    data_key="name",
    required=True,
    validate=validate.Length(min=1, max=50)
  )
  user_nick = fields.Str(
    data_key="nickname",
    validate=validate.Length(max=50)
  )
  user_email = fields.Str(
    data_key="email"
  )
  user_mobile = fields.Str(
    data_key="mobile",
    validate=validate.Length(max=20)
  )
  
  @validates("user_pw")
  def validate_user_pw(self, value):
    print("="*15, "validate_user_pw", "="*15)
    pprint({ "data": value }, indent=2 )
    size, min, max = ( len(value), 4, 100 )
    
    if min > size or size > max:
      raise ValidationError("Length must be between %d and %d." % ( min, max ))

  @validates("user_email")
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
    
    user_pw = data.get("user_pw", None)
    user_pw_chk = data.get("user_pw_chk", None)
    if user_pw_chk is not None and user_pw != user_pw_chk:
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
    
    if "user_pw" in data:
      data["user_pw"] = Encrypt.encrypt(data["user_pw"])

    if "user_pw_chk" in data:
      data.pop("user_pw_chk")

    return data
