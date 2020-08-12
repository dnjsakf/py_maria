import traceback
from cryptography.fernet import Fernet, InvalidToken

class Encrypt(object):
  key = None

  @classmethod
  def write_key(cls):
    key = Fernet.generate_key()
    with open("key.key", "wb") as key_file:
        key_file.write(key)

  @classmethod
  def load_key(cls):
    key = cls.key
    if key is None:
      try:
        key = open("key.key", "rb").read()
      except FileNotFoundError as e:
        cls.write_key()
        key = open("key.key", "rb").read()
      except Exception as e:
        key = Fernet.generate_key()
      cls.key = key
    return key

  @classmethod
  def encrypt(cls, plain):
    key = cls.load_key()
    return Fernet(key).encrypt(plain.encode("utf-8")).decode("utf-8")

  @classmethod
  def decrypt(cls, encrypted):
    key = cls.load_key()
    try:    
      return Fernet(key).decrypt(encrypted.encode("utf-8")).decode("utf-8")
    except InvalidToken as e:
      traceback.print_exc()
    return None
    
  @classmethod
  def compare(cls, plain, encrypted):
    return plain == cls.decrypt(encrypted)