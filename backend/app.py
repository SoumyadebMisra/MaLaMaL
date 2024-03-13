import os, ast
from . import app, db
from flask import request, make_response
from .models import Users
from svix import Webhook
from dotenv import load_dotenv

load_dotenv()

secret = os.getenv("WEBHOOK_SECRET")
wh = Webhook(secret)

@app.route("/")
def home():
    return "hello world", 200

@app.route("/signup", methods=["POST"])
def signup():
    body = request.data
    headers = request.headers
    print('body: ', body)
    print('headers: ', headers)
    try:
        data = wh.verify(body, headers)["data"]
        
        # create the new user on signup
        user = Users(id=data["id"], username=data["username"], firstname=data["first_name"], lastname=data["last_name"])

        db.session.add(user)
        db.session.commit()

        return make_response({
            "success": True,
            "message": "user created"
        }, 200)
    except Exception as e:
        print("Error processing webhook:", str(e))
        return "Error processing webhook", 400

if __name__=='__main__':
    app.run(debug=True)
