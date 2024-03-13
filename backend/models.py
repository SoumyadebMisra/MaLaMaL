from . import db

class Users(db.Model):
    __tablename__ = "Users"
    id = db.Column(db.String, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    firstname = db.Column(db.String)
    lastname = db.Column(db.String)

    def __repr__(self):
        return f'<User: {self.id} - {self.username}>'



