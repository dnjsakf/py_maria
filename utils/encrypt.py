from cryptography.fernet import Fernet

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
  def encrypt(cls, data):
    key = cls.load_key()
    return Fernet(key).encrypt(data.encode())

  @classmethod
  def decrypt(cls, data):
    key = cls.load_key()
    return Fernet(key).decrypt(data)