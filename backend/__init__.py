import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from flask_migrate import Migrate

load_dotenv()

app = Flask(__name__)

db = SQLAlchemy()

db_url = os.getenv("DATABASE_URL")

app.config["SQLALCHEMY_DATABASE_URI"] = db_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# initialize db with flask app
db.init_app(app)

# configure migrations
migrate = Migrate(app, db)
