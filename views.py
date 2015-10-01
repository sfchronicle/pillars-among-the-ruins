from flask import render_template, redirect, url_for

from app import app, db
from models import Profile

@app.route('/')
def index():
    return redirect(url_for('mainbar'))

@app.route('/mainbar/')
def mainbar():
    profiles = Profile.query.all()
    return render_template(
        'mainbar.html',
        title='mainbar',
        profiles=profiles
    )

@app.route('/<slug>/')
def profile(slug):
    profiles = Profile.query.all()
    profile = Profile.query.filter_by(slug=slug).all()[0]

    return render_template(
        'profile.html',
        title='profile',
        profile=profile,
        profiles=profiles
    )
