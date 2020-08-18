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
    self.__connection = mariadb.connect(**config)
    self.__connection.autocommit = False
    
    return self.__connection

  def close(self):
    if self.__connection is not None:
      self.__connection.close()

  def commit(self):
    self.__connection.commit()
  
  def rollback(self):
    self.__connection.rollback()
      
  def select(self, sql, values, **kwargs):
    cur = self.__connection.cursor()
    cur.execute( sql, values )
    
    headers = [x[0].lower() for x in cur.description]
    rv = cur.fetchall()
    
    if rv is not None:
      return [ dict(zip(headers, res)) for res in rv ]
    
    return None
    
  def select_one(self, sql, values, *args, **kwargs):
    cur = self.__connection.cursor()
    cur.execute( sql, values )
    
    headers = [x[0].lower() for x in cur.description]
    rv = cur.fetchone()
    
    if rv is not None:
      return dict(zip(headers, rv))
      
    return None
    
  def insert_one(self, sql, values, **kwargs):
    inserted = -1
    try:
      cur = self.__connection.cursor()
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
    
      cur = self.__connection.cursor()
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
      cur = self.__connection.cursor()
      cur.execute( sql, conds )

      deleted = cur.rowcount
      
      self.commit()
    
      return deleted

    except Exception as e:
      self.rollback()
      raise e
      
      
    
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
  
