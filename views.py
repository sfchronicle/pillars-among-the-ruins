from flask import render_template  #, redirect, url_for

from app import app, db
from models import *


@app.route('/')
def index():
    return render_template('index.html', title='index')

@app.route('/p/')
def profiles():
    return render_template('profiles/index.html', title='profiles')

@app.route('/p/<profile>')
def profile(profile):
    return render_template('profiles/{}.html'.format(profile), title='profile')
