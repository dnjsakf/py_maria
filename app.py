import mariadb

from models import UserModel
from utils.encrypt import Encrypt
from cryptography.fernet import Fernet

# Connect to MariaDB Platform
try:
  conn = mariadb.connect(
    user="DOCHI",
    password="dochi",
    host="127.0.0.1",
    port=3306,
    database="DOCHI"
  )
except mariadb.Error as e:
  print(f"Error connecting to MariaDB Platform: {e}")

# Get Cursor
username = 'admin'

cur = conn.cursor()
cur.execute('''
  SELECT T1.USER_ID
      , T1.USER_NAME
      , T1.USER_PWD
      , T1.USER_NICK
      , T2.AUTH_ID
      , T1.REG_USER
      , T1.REG_DTTM
    FROM DOCHI.AT_USER T1
    LEFT OUTER JOIN DOCHI.AT_USER_AUTH_MAP T2
      ON T2.USER_ID = T1.USER_ID
    AND T2.IS_MAJOR = 'Y'
  WHERE 1=1
    AND T1.USER_ID = ?
''',
( username, ))

row_headers=[x[0].lower() for x in cur.description]
rv = cur.fetchall()
for result in rv:
  data = dict(zip(row_headers, result))

  user = UserModel( data )

  print( user.user_pwd )

conn.close()