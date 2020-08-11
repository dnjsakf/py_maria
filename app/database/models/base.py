import app.utils.datetime as dt

from schematics.models import Model
from schematics.types import StringType
from schematics.exceptions import DataError

from app.utils.encrypt import Encrypt

class BaseModel(Model):
  reg_user = StringType(required=True, max_length=50, default="SYSTEM")
  reg_dttm = StringType(required=True, max_length=14, default=lambda:dt.now().strftime("%Y%m%d%H%M%S"))
