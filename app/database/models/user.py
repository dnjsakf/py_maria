from schematics.models import Model
from schematics.types import StringType
from schematics.transforms import blacklist

from app.database.models import BaseModel
from app.utils.encrypt import Encrypt

class EncyptedType(StringType):
  def to_primitive(self, value, context=None):
    return Encrypt.encrypt(value)

class UserModel(BaseModel):
  user_id = StringType(required=True, max_length=50)
  user_pwd = EncyptedType(required=True, max_length=100)
  user_name = StringType(required=True, max_length=50)
  user_nick = StringType(max_length=50)
  email = StringType(max_length=100)
  cell_phone = StringType(max_length=20)

  auth_id = StringType()

  class Options:
    roles = {
      'public': blacklist('user_pwd'),
      'save': blacklist('auth_id'),
    }
