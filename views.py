from flask import render_template, redirect, url_for

from app import app, db, freezer
from models import Profile, Slide

@app.route('/')
def index():
    profiles = Profile.query.all()
    return render_template(
        'landing.html',
        title='landing',
        profiles=profiles
    )


@app.route('/mainbar')
def mainbar_view():
    profiles = Profile.query.all()
    return render_template(
        'mainbar.html',
        title='mainbar',
        profiles=profiles
    )

@app.route('/<slug>/')
def profile_view(slug):
    profile = Profile.query.filter_by(slug=slug)[0]
    profiles = Profile.query.filter(Profile.slug != slug)
    slides = profile.slides.order_by(Slide.ordering)

    return render_template(
        'profile.html',
        title='profile',
        profile=profile,
        profiles=profiles,
        slides=slides
    )


@freezer.register_generator
def profile_view():
    for profile in Profile.query.all():
        yield { 'slug': profile.slug }
