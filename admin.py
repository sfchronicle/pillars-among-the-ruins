import flask_admin as admin
from flask_admin.contrib.sqla import ModelView

from app import app, db
from models import Profile, Slide

# Admin
admin = admin.Admin(app)
admin.add_view(ModelView(Profile, db.session))
admin.add_view(ModelView(Slide, db.session))
