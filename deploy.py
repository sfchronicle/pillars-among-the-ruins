import os

from smbclient import SambaClient
from flask.ext.frozen import Freezer

from app import app, assets, Environment
from settings.production import (
    S3_BUCKET_NAME,
    EXTRAS_PASS,
    EXTRAS_USER,
    EXTRAS_DOMAIN,
    EXTRAS_SHARE,
    EXTRAS_SERVER
)
from views import *

BUILD_DIR = os.path.join(os.path.realpath(os.path.dirname(__file__)), 'build')
PROJECT_NAME = '2015/pillars-among-the-ruins/'
freezer = Freezer(app)


class CustomSambaClient(SambaClient):
    """
    Subclassing SambaClient to use `mput` for recursive upload
    Docs: https://www.samba.org/samba/docs/man/manpages-3/smbclient.1.html
    """
    def mput(self, local_path, remote_path):
        remote_path = remote_path.replace('/', '\\')
        result = self._runcmd('mput', local_path, remote_path)


def s3deploy():
    """Deploy to AWS S3 bucket"""
    print('Uploading ...')
    command = 'aws s3 cp --recursive --acl public-read {} s3://{}/{}'.format(
        BUILD_DIR,
        S3_BUCKET_NAME,
        PROJECT_NAME
    )
    os.system(command)
    print('Project deployed!')

def smbdeploy():
    """Deploy to SFGate extras server"""
    print('Uploading ...')
    remote_path = os.path.join('Projects', PROJECT_NAME)
    smb = CustomSambaClient(
        server=EXTRAS_SERVER,
        share=EXTRAS_SHARE,
        username=EXTRAS_USER,
        password=EXTRAS_PASS,
        domain=EXTRAS_DOMAIN
    )

    smb.upload(os.path.join(BUILD_DIR, '*'), remote_path)
    print('Project deployed!')


if __name__ == '__main__':
    app.config['DEBUG'] = False
    app.config['ASSETS_DEBUG'] = False
    app.config['FREEZER_RELATIVE_URLS'] = True

    freezer.freeze()
    s3deploy()
