
class DochiError(Exception):
  '''Dochi's Base Exception'''
  pass
  
class NotFoundUserError(DochiError):
  '''Dochi's Not Found User Error'''
  pass
  
class NoMatchedPasswordError(DochiError):
  '''Dochi's No Matched Password Error'''
  def __init__(self, message="Not found user.", code=500):
    self.message = message
    self.code = code
    super().__init__(self.message)

  
class NotExistsToken(DochiError):
  '''Dochi's Not Exists Token Error'''
  pass
    