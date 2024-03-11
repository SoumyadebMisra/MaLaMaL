from app import app

@app.route("/signup")
def signup():
    return "this is a signup page"