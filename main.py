import os
from app import app, db

from admin import admin
from models import *
from views import *

if __name__ == '__main__':
    # Start app
    app.config['DEBUG'] = True
    app.run()
