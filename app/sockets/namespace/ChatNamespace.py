from socketio import Namespace
from urllib.parse import urlsplit, parse_qsl 

class ChatNamespace(Namespace):
  def __init__(self, sio, namespace, *args, **kwargs):
    super(Namespace, self).__init__(namespace)
    
    self.sio = sio
    self.logger = sio.logger

  def on_connect(self, sid, env):
    params = dict(parse_qsl(urlsplit(env["QUERY_STRING"]).path))
    
    print(f'{ sid } [SOCKET][CONNECT]')    
    print(f'{ sid } [SOCKET][CONNECT][PARAMS] { params }')
    
  def on_message(self, sid, data):
    print(f'{ sid } [SOCKET][MESSAGE] { data }')
    
    self.emit("receive_message", data)
  
  def on_disconnect(self, sid):
    print(f'{ sid } [SOCKET][DISCONNECT]')