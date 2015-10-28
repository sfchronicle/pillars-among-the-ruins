from datetime import datetime
from app import db

# Create models here


class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    body = db.Column(db.Text())
    slug = db.Column(db.String(100))
    image_url = db.Column(db.String(100))
    video_url = db.Column(db.String(100))

    slides = db.relationship('Slide', backref=db.backref('profile', lazy='joined'), lazy='dynamic')

    def __unicode__(self):
        return self.name

    def __repr__(self):
        return '<Profile: {}>'.format(self.name)


class Slide(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text())
    image_url = db.Column(db.String(100))
    video_url = db.Column(db.String(100))
    ordering = db.Column(db.Integer())

    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'))
