
class DochiError(Exception):
  '''Dochi's Base Exception'''
  pass
  
class EmptyDataError(DochiError):
  '''Dochi's Empty Data Error'''
  def __init__(self, message="Empty data.", code=204):
    self.message = message
    self.code = code
    super().__init__(self.message)
  
class NotFoundUserError(DochiError):
  '''Dochi's Not Found User Error'''
  def __init__(self, message="Not found user.", code=304):
    self.message = message
    self.code = code
    super().__init__(self.message)
  
  
class NoMatchedPasswordError(DochiError):
  '''Dochi's No Matched Password Error'''
  def __init__(self, message="No matched password.", code=203):
    self.message = message
    self.code = code
    super().__init__(self.message)

  
class NotExistsToken(DochiError):
  '''Dochi's Not Exists Token Error'''
  def __init__(self, message="Not exists token.", code=401):
    self.message = message
    self.code = code
    super().__init__(self.message)
