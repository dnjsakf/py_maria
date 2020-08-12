import traceback
import mariadb

from functools import wraps
from flask import current_app as app, g

class MariaDB(object):
  def __init__(self, user, password, host, port, database, **kwargs):      
    self.connect(
      user=user,
      password=password,
      host=host,
      port=port,
      database=database
    )

  @property
  def connection(self):
    return self.__connection

  def connect(self, **config):
    try:
      self.__connection = mariadb.connect(**config)
      self.__connection.autocommit = False
    except mariadb.Error as e:
      print(f"Error connecting to MariaDB Platform: {e}")
      
    return self.__connection

  def close(self):
    if self.__connection is not None:
      self.__connection.close()

  def commit(self):
    self.__connection.commit()
  
  def rollback(self):
    self.__connection.rollback()
      
  def select(self, sql, *args, **kwargs):
    cur = self.__connection.cursor()
    cur.execute( sql, args )
    
    headers = [x[0].lower() for x in cur.description]
    rv = cur.fetchall()
    
    if rv is not None:
      return [ dict(zip(headers, res)) for res in rv ]
    
    return None
    
  def select_one(self, sql, *args, **kwargs):
    cur = self.__connection.cursor()
    cur.execute( sql, args )
    
    headers = [x[0].lower() for x in cur.description]
    rv = cur.fetchone()
    
    if rv is not None:
      return dict(zip(headers, rv))
      
    return None
    
  def insert_one(self, sql, *args, **kwargs):
    print( sql, args )
    try:
      cur = self.__connection.cursor()
      cur.execute( sql, args )
      
      self.commit()
    except:
      traceback.print_exc()
      self.rollback()
    
    return cur.rowcount
    
def get_db():
  if 'db' not in g:
    g.db = MariaDB(**app.config["MARIADB_CONFIG"])
    
def close_db(error):
  db = g.pop('db', None)
  if db is not None:
    db.close()
    
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