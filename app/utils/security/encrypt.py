from cryptography.fernet import Fernet, InvalidToken

class Encrypt(object):
  __key = None
  __encoding = "utf-8"

  @classmethod
  def write_key(cls):
    cls.__key = Fernet.generate_key()
    
    with open("key.key", "wb") as key_file:
      key_file.write(key)
      
    return cls.__key
    
  @classmethod
  def load_key(cls):
    if cls.__key is not None:
      return cls.__key
      
    try:
      return open("key.key", "rb").read()
    except FileNotFoundError as e:
      return cls.write_key()
    except Exception as e:
      return Fernet.generate_key()
  
  @classmethod
  def encrypt(cls, plain):
    key = cls.load_key()
    value = plain.encode(cls.__encoding)
    
    return Fernet(key).encrypt(value).decode(cls.__encoding)
  
  @classmethod
  def decrypt(cls, encrypted):
    key = cls.load_key()
    value = encrypted.encode(cls.__encoding)
  
    return Fernet(key).decrypt(value).decode(cls.__encoding)

  @classmethod
  def compare(cls, plain, encrypted):
    return plain == cls.decrypt(encrypted)

  @classmethod
  def set_encoding(cls, encoding="utf-8"):
    cls.__encoding = encoding