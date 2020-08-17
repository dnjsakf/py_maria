import pytest
import os

from app.app import create_app

@pytest.fixture
def client():
  ROOT_PATH = os.path.dirname(os.path.abspath(__file__))
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

def test_pingpong(client):
  rv = client.get('/ping')

  assert rv.data.decode() == "pong"
