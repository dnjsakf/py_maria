from pytz import timezone
from datetime import datetime, timedelta

KST = timezone('Asia/Seoul')

def now(**kwargs) -> datetime:
  return datetime.now(KST)+timedelta(**kwargs)
  
def nowTS(**kwargs) -> float:
  return datetime.timestamp(now(**kwargs))
  
def timestamp(dt:datetime) -> float:
  return datetime.timestamp(dt)

def reform(str_dt, in_fmt="%Y%m%d%H%M%S", out_fmt="%Y-%m-%d %H:%M:%S"):
  return datetime.strptime(str_dt, in_fmt).strftime(out_fmt)