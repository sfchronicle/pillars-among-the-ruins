import os

S3_BUCKET_NAME = 'projects.sfchronicle.com'
S3_REGION = 'us-west-1'

try:
    from local_settings import *
except ImportError:
    pass
