import os
import json
import pytest

from app.app import create_app

@pytest.fixture(scope='module') # Multiple Used
def client():
  print("create app")
  
  ROOT_PATH = "../"
  STATIC_FOLDER = os.path.join(ROOT_PATH, "public")
  TEMPLATE_FOLDER = STATIC_FOLDER

  app = create_app(
    root_path=ROOT_PATH,
    static_url_path="/static/",
    static_folder=STATIC_FOLDER,
    template_folder=TEMPLATE_FOLDER
  )

  with app.test_client() as client:
    yield client
    
  print("close app")


@pytest.mark.skip
def test_ping_pong(self, client):
  rv = client.get('/ping')
  print( 'ping, {}'.format(rv.data.decode()) )
  assert rv.status_code == 200
  assert rv.data.decode() == "pong"


#@pytest.mark.skip
class TestSignUp(object):
  '''
    TestSignUp
  '''
  uri = "/security/signup"
  message = "Failed signup."
  
  def signup(self, client, user):
    resp = client.post(self.uri, data=user)
    
    assert resp.status_code == 200
    assert resp.headers["Content-Type"].split(";")[0] == "application/json"
    
    rv = json.loads(resp.data)
    
    assert rv.get("success", None) == True, rv.get("message", self.message)
    

  @pytest.mark.parametrize(
    "user", ({ 
      "user_id": "asdf", 
      "user_pwd": "asdf",
      "user_pwd_chk": "asdf",
      "user_name": "asdf",
      "user_nick": "asdf",
      "email": "asdf@asdf.com",
      "cell_phone": "010-1234-5678",
    },)
  )
  def test_success_full(self, client, user):
    self.signup(client, user)
  
  
  
class TestSignIn(object):
  '''
    TestSignIn
  '''
  uri = "/security/signin"
  token_uri = "/security/check"
  message = "Failed signin."
  
  def signin(self, client, user):
    resp = client.post(self.uri, data=user)
    
    assert resp.status_code == 200    
    assert resp.headers["Content-Type"].split(";")[0] == "application/json"
    
    rv = json.loads(resp.data)
    
    assert rv.get("success", None) == True, rv.get("message", self.message)
    assert rv.get("access_token", None) is not None, "No access token."
  
  @pytest.mark.parametrize(
    "user", ({ 
      "user_id": "", 
      "user_pwd": "" 
    },)
  )
  def test_empty_user_id(self, client, user):
    self.signin(client, user)
    
  @pytest.mark.parametrize(
    "user", ({ 
      "user_id": "asdf", 
      "user_pwd": "" 
    },)
  )
  def test_empty_user_pwd(self, client, user):
    self.signin(client, user)
    
  @pytest.mark.parametrize(
    "user", ({ 
      "user_id": "asdf", 
      "user_pwd": "a" 
    },)
  )
  def test_no_matched_password(self, client, user):
    self.signin(client, user)

  @pytest.mark.parametrize(
    "user", ({ 
      "user_id": "asdf", 
      "user_pwd": "asdf" 
    },)
  )
  def test_success(self, client, user):
    self.signin(client, user)
    
  @pytest.mark.parametrize(
    "user", ({ 
      "user_id": "asdf", 
      "user_pwd": "asdf" 
    },)
  )
  def test_check_token(self, client, user):
    resp = client.post(self.token_uri, data=user)
    
    assert resp.status_code == 200    
    assert resp.headers["Content-Type"].split(";")[0] == "application/json"
    
    rv = json.loads(resp.data)
    
    assert rv.get("success", None) == True, rv.get("message", self.message)
    assert rv.get("access_token", None) is not None, "No access token."

#@pytest.mark.skip
class TestResign(object):
  '''
    TestResign
  '''
  uri = "/security/resign"
  message = "Failed resign."
  
  def resign(self, client, user):
    resp = client.post(self.uri, data=user)
    
    assert resp.status_code == 200
    assert resp.headers["Content-Type"].split(";")[0] == "application/json"
    
    rv = json.loads(resp.data)
    
    assert rv.get("success", None) == True, rv.get("message", self.message)
    assert rv.get("deleted", -1) > -1, "%s, %d" % ( self.message, rv.get("deleted", -1) )
  
  @pytest.mark.parametrize(
    "user", ({ 
      "user_id": "asdf", 
      "user_pwd": ""
    },)
  )
  def test_empty_password(self, client, user):
    self.resign(client, user)
    
  @pytest.mark.parametrize(
    "user", ({ 
      "user_id": "asdf", 
      "user_pwd": "1234"
    },)
  )
  def test_no_matched_password(self, client, user):
    self.resign(client, user)
    
  @pytest.mark.parametrize(
    "user", ({ 
      "user_id": "asdf", 
      "user_pwd": "asdf"
    },)
  )
  def test_success(self, client, user):
    self.resign(client, user)
    

    
class TestDuplCheck(object):
  '''
    TestDuplCheck
  '''
  uri = "/security/duplcheck"
  message = "Duplicated 'User ID'"
  
  def resign(self, client, user):
    resp = client.post(self.uri, data=user)
  
  @pytest.mark.parametrize(
    "user", ({
      "user_id": "admin"
    },)
  )
  def test_dupl(self, client, user):
    resp = client.post(self.uri, data=user)
    
    assert resp.status_code == 200
    assert resp.headers["Content-Type"].split(";")[0] == "application/json"
    
    rv = json.loads(resp.data)
    
    print( rv )
    
    assert rv.get("success", None) == True, rv.get("message", self.message)