import app.utils.datetime as dt

from datetime import datetime

from marshmallow import Schema, fields, validate, pprint
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
  
  def setData(self, data):
    try:
      return ( True, self.load(data), None )
    except ValidationError as e:
      return ( False, None, e.messages )
  
  def getData(self, *args, **kwargs):
    pass

  @post_dump
  def post(self, data, **kwargs):
    reg_dttm = data.get("reg_dttm", None)
    if reg_dttm is not None:
      data["reg_dttm"] = datetime.strptime(reg_dttm, "%Y%m%d%H%M%S").strftime("%Y-%m-%d %H:%M:%S")

    return data