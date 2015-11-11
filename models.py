from datetime import datetime
from app import db


class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    body = db.Column(db.Text())
    slug = db.Column(db.String(100))
    image_url = db.Column(db.String(100))
    vimeo_id = db.Column(db.Integer())

    slides = db.relationship('Slide', backref=db.backref('profile', lazy='joined'), lazy='dynamic')

    def __unicode__(self):
        return self.name

    def __repr__(self):
        return '<Profile: {}>'.format(self.name)


class Slide(db.Model):

    SLIDE_CHOICES = (
        ('two_up', 'Photo on left with text on the right'),  # this should have a lede option
        ('vignette', 'Video vignette for profile'),
        ('large_display', 'Optional large photo with optional text'),  # this one will have optional overlays and text, optional toggle for subhed
        ('small_photo', 'small photo with optional text'),  # this one will have optional overlays and text
    )

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text())
    subhed = db.Column(db.String(100))
    image_url = db.Column(db.String(100))
    ordering = db.Column(db.Integer())

    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'))

    template = db.Column(db.String(100))

    is_video = db.Column(db.Boolean())
    is_lede = db.Column(db.Boolean())
    is_end = db.Column(db.Boolean())
    show_text = db.Column(db.Boolean())

    custom_css = db.Column(db.Text())
