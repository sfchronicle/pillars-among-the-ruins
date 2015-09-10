from datetime import datetime
from app import db

# Create models here


class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    body = db.Column(db.Text())
    slug = db.Column(db.String(100))
    video_url = db.Column(db.String(100))

    def __unicode__(self):
        return self.name

    def __repr__(self):
        return '<Profile: {}>'.format(self.name)
