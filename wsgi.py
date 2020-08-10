import os
import dotenv

from app.app import create_app

# Set Constant Variables
ROOT_PATH = os.path.dirname(os.path.abspath(__file__))
STATIC_FOLDER = os.path.join(ROOT_PATH, "public")
TEMPLATE_FOLDER = STATIC_FOLDER

app = create_app(
  root_path=ROOT_PATH,
  static_url_path="/static/",
  static_folder=STATIC_FOLDER,
  template_folder=TEMPLATE_FOLDER
)

if __name__ == '__main__':
  dotenv.load_dotenv(dotenv_path=".env")

  app.run(host="localhost", port=3000)