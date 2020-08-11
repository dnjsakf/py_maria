from schematics.models import Model
from schematics.types import StringType

from app.database.models import BaseModel

class AuthModel(BaseModel):
  auth_id = StringType(required=True, max_length=50)
  auth_name = StringType(required=True, max_length=50)
