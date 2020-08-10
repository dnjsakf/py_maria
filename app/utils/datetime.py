from pytz import timezone
from datetime import datetime, timedelta

KST = timezone('Asia/Seoul')

def getNow(**kwargs) -> datetime:
  return datetime.now(KST)+timedelta(**kwargs)
