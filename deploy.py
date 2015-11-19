import os
import sys

from app import app, assets, Environment, freezer
from views import *

BUILD_DIR = os.path.join(os.path.realpath(os.path.dirname(__file__)), 'build')
S3_BUCKET_NAME = 'projects.sfchronicle.com'
ROOT_URL = '//extras.sfgate.com/Projects'
TEST_PROJECT_NAME = 'test-proj'

PROJECT_NAME = '2015/pillar-among-the-ruins/'

def upload_assets():
    print('Uploading ...')
    command = 'aws s3 cp --recursive --acl public-read {} s3://{}/{}'.format(
        BUILD_DIR,
        S3_BUCKET_NAME,
        PROJECT_NAME
    )
    os.system(command)
    print('Project deployed!')

if __name__ == '__main__':
    app.config['DEBUG'] = False
    app.config['ASSETS_DEBUG'] = False
    app.config['FREEZER_BASE_URL'] = '{}/{}'.format(ROOT_URL, TEST_PROJECT_NAME)

    for arg in sys.argv[1:]:
        if arg == 'build':
            freezer.freeze()
        elif arg == 'publish':
            upload_assets()
        else:
            print('Please specify whether to `build` or `publish` the project')
