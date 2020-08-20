import traceback
import mariadb

from functools import wraps
from flask import current_app as app, g


class AbstractMariaDB(object):
  auto_commit = False

  @classmethod
  def init(cls, **kwargs):
    for key, item in kwargs.items():
      setattr(cls, key, item)
      
  @classmethod
  def get_db(cls, **kwargs):
    return cls(**kwargs)
    
  @classmethod
  def connect(cls, **kwargs):
    required = [ "host", "port", "database", "user", "password" ]
    
    config = dict()
    for key in required:
      config[key] = kwargs.get(key, getattr(cls, key, None))
      if config[key] is None:
        raise Exception("Required argument '%s'." % ( key ))
        
    conn = mariadb.connect(**config)
    conn.autocommit = cls.auto_commit
    
    print("Connected, %s" % ( conn.connection_id ))
        
    return conn
    
  @classmethod
  def getCursor(cls):
    conn = getattr(cls, "__conn", None)
    print( conn )

class MariaDB(AbstractMariaDB):
  def __init__(self, *args, **kwargs):
    self.args = args
    self.kwargs = kwargs
    
    self.__conn = self.connect()
    
    print( self.getCursor() )

  def close(self):
    if self.__conn is not None:
      self.__conn.close()

  def commit(self):
    self.__conn.commit()
    
  def rollback(self):
    self.__conn.rollback()
      
  def select(self, sql, values, **kwargs):
    cur = self.__conn.cursor()
    cur.execute( sql, values )
    
    headers = [x[0].lower() for x in cur.description]
    rv = cur.fetchall()
    
    if rv is not None:
      return [ dict(zip(headers, res)) for res in rv ]
    
    return None
    
  def select_one(self, sql, values, *args, **kwargs):
    cur = self.__conn.cursor()
    cur.execute( sql, values )
    
    headers = [x[0].lower() for x in cur.description]
    rv = cur.fetchone()
    
    if rv is not None:
      return dict(zip(headers, rv))
      
    return None
    
  def insert_one(self, sql, values, **kwargs):
    inserted = -1
    try:
      cur = self.__conn.cursor()
      cur.execute( sql, values )

      inserted = cur.rowcount
      
      self.commit()
    
      return inserted

    except Exception as e:
      self.rollback()
      raise e
      
  def update_one(self, sql, values, conds, **kwargs):
    updated = -1
    try:
      prepared = list(values)
      prepared.extend(conds)
    
      cur = self.__conn.cursor()
      cur.execute( sql, prepared )

      updated = cur.rowcount
      
      self.commit()
    
      return updated

    except Exception as e:
      self.rollback()
      raise e
      
  def delete_one(self, sql, conds, **kwargs):
    deleted = -1
    try:
      cur = self.__conn.cursor()
      cur.execute( sql, conds )

      deleted = cur.rowcount
      
      self.commit()
    
      return deleted

    except Exception as e:
      self.rollback()
      raise e

    
def with_db(func):
  @wraps(func)
  def wrapper(self, *args, **kwargs):
    db = g.get("db", None)
    if db is None:
      return None
    return func(self, db, *args, **kwargs)
  return wrapper
  
def with_maria(config=None):
  def decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
      db = MariaDB(**config)
      res = func(*args, db, **kwargs)
      db.close()
      return res
    return wrapper
  return decorator
  
