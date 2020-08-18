from app.utils.time import datetime as dt

from pprint import pprint

from marshmallow import Schema, fields, validate
from marshmallow.exceptions import ValidationError
from marshmallow.decorators import post_dump

class BaseSchema(Schema):
  reg_user = fields.Str(
    #default="SYSTEM", # Dumping
    missing="SYSTEM",  # Loading
    validate=validate.Length(max=50)
  )
  reg_dttm = fields.Str(
    #default=dt.now().strftime("%Y%m%d%H%M%S"), # Dumping
    missing=dt.now().strftime("%Y%m%d%H%M%S"),  # Loading
    validate=validate.Length(max=14)
  )

  @post_dump
  def post(self, data, **kwargs):
    reg_dttm = data.get("reg_dttm", None)
    if "reg_dttm" is not None:
      data["reg_dttm"] = dt.reform(reg_dttm)

    return data