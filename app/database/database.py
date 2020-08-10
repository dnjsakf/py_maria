import mariadb

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

  def connection(self):
    return self.__connection

  def connect(self, **config):
    try:
      self.__connection = mariadb.connect(**config)
    except mariadb.Error as e:
      print(f"Error connecting to MariaDB Platform: {e}")
      
    return self.__connection

  def close(self):
    if self.__connection is not None:
      self.__connection.close()
      
  def select(self, sql, *args):
    cur = self.__connection.cursor()
    cur.execute( sql, args )
    
    headers = [x[0].lower() for x in cur.description]
    rv = cur.fetchall()    
    
    if rv is not None:
      return [ dict(zip(headers, res)) for res in rv ]
    
    return None
    
  def select_one(self, sql, *args):
    cur = self.__connection.cursor()
    cur.execute( sql, args )
    
    headers = [x[0].lower() for x in cur.description]
    rv = cur.fetchone()
    
    if rv is not None:
      return dict(zip(headers, rv))
      
    return None
    
def get_db():
  if 'db' not in g:
    g.db = MariaDB(**app.config["MARIADB_CONFIG"])
    
def close_db(error):
  db = g.pop('db', None)
  if db is not None:
    db.close()