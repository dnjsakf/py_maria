from app.database.models import BaseSchema

from marshmallow import fields, validate, pprint

class AuthSchema(BaseSchema):
  auth_id = fields.Str(required=True, validate=validate.Length(max=50))
  auth_name = fields.Str(required=True, validate=validate.Length(max=50))
