from flask import render_template  #, redirect, url_for

from app import app, db
from models import Profile


@app.route('/')
def index():
    return render_template('index.html', title='index')

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
    profile = Profile.query.filter_by(slug=slug).all()[0]
    return render_template('profiles/profile.html', title='profile', profile=profile)
