from flask import render_template  #, redirect, url_for

from app import app, db
from models import Profile

@app.route('/')
def landing():
    profiles = Profile.query.all()
    return render_template('story-landing.html', title='story-landing', profiles=profiles)

@app.route('/story/')
def story():
    profiles = Profile.query.all()
    return render_template('story.html', title='story', profiles=profiles)

@app.route('/p/')
def profiles():
    profiles = Profile.query.all()
    return render_template(
        'profiles/profiles.html',
        title='profiles',
        profiles=profiles
    )

@app.route('/p/<slug>/')
def profile(slug):
    profiles = Profile.query.all()
    profile = Profile.query.filter_by(slug=slug).all()[0]
    return render_template('profiles/profile.html',
        title='profile', profile=profile, profiles=profiles)
