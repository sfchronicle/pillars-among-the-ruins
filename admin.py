import flask_admin as admin
from flask_admin.contrib.sqla import ModelView

from app import app, db
from models import Profile, Slide

# Admin
admin = admin.Admin(app)


class ProfileView(ModelView):
    inline_models = (Slide,)

admin.add_view(ProfileView(Profile, db.session))
