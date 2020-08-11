from pytz import timezone
from datetime import datetime, timedelta

KST = timezone('Asia/Seoul')

def now(**kwargs) -> datetime:
  return datetime.now(KST)+timedelta(**kwargs)
  
def nowTS(**kwargs) -> float:
  return datetime.timestamp(now(**kwargs))
  
def timestamp(dt:datetime) -> float:
  return datetime.timestamp(dt)