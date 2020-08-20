import pytest

class AbstractDB(object):
  @classmethod
  def init(cls, **kwargs):
    for key, item in kwargs.items():
      setattr(cls, key, item)
      
  @classmethod
  def connect(cls, **kwargs):
    return cls(**kwargs)
    

class MyDB(AbstractDB):
  def __init__(self, **kwargs):
    for k, v in kwargs.items():
      if v is None:
        v = getattr(self, k, None)
      setattr(self, k, v)
    
    self.connect()

  def connect(self):
    print( self.host )
    print( self.port )
    print( self.database )
    print( self.password )
    print( self.user )


def test_case_a():
  config = {
    "host": "127.0.0.1",
    "port": 3306,
    "database": "DOCHI",
    "user": "DOCHI",
    "password": "dochi"
  }

  MyDB.init(**config).connect()

  caseA = MyDB()
  assert caseA.host == config.get("host")
  assert caseA.port == config.get("port")
  assert caseA.database == config.get("database")
  assert caseA.user == config.get("user")
  assert caseA.password == config.get("password")
  
  caseB = MyDB(
    host = "localhost",
    port = 4000
  )
  assert caseB.host == "localhost"
  assert caseB.port == 4000
  assert caseB.database == config.get("database")
  assert caseB.user == config.get("user")
  assert caseB.password == config.get("password")
  
