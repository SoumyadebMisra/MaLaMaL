from flask import Flask, request, jsonify
app = Flask(__name__)



from flask import Flask, request, jsonify
from svix.webhooks import Webhook
import os
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy.sql import func

# Base = declarative_base()

db_url = "postgresql://technica_owner:XM4quaI2xgkW@ep-icy-truth-a1zt8c62.ap-southeast-1.aws.neon.tech/technica?sslmode=require"
print('db_url: ', db_url)

app.config['SQLALCHEMY_DATABASE_URI'] = db_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

mydb = SQLAlchemy(app)

webhook_secret = "whsec_5CGOtrgm3gidu6nbpZmJ7U0xyQxQItbm"
wh = Webhook(webhook_secret)

class UserData(mydb.Model):
    id = mydb.Column(mydb.String, primary_key=True)
    username = mydb.Column(mydb.String)

    def __repr__(self):
        return f'<Student {self.id} : {self.username}>'

@app.route('/')
def hello():
    return 'Hello, World!!!'

@app.route("/signup", methods=['POST'])
def signup():
    payload = request.data
    headers = request.headers
    try:
        data = wh.verify(payload, headers)["data"]
        print(type(data))
        print("Received data: ", data)
        # Store the extracted data in the custom database
        # session = Session()
        id = data["id"]
        username = getattr(data, "username", "rohit")
        print(id)
        print(username)
        user_data = UserData(id, username)
        mydb.session.add(user_data)
        mydb.session.commit()
        mydb.session.close()
        # session.add(user_data)
        # session.commit()
        # session.close()
        return "Webhook received successfully", 200
    except Exception as e:
        # If verification or parsing fails, log the error
        print("Error processing webhook:", str(e))
        return "Error processing webhook", 400

if __name__ == '__main__':
    app.run(debug=True)
