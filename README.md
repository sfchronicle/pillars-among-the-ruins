# Pillars Among the Ruins
Description TK

## Requirements
- Python 2.7.x
- Node.js 0.12
  - uglifyjs (`npm install -g uglifyjs`)
  - clean-css (`npm install -g clean-css`)
  - Bower and Grunt (`$ npm install -g grunt-cli bower`)
 - Samba (`brew install samba`)

## Activate
Already have the project installed? Here's how you re-activate for development:
```bash
$ cd pillars-among-the-ruins  # change into the directory
$ workon pillars-among-the-ruins  # activate virtual environment
$ git pull  # pull down latests
$ bower install # install new frontend dependencies
$ grunt serve # start server
```

## Installation
First time with the project? Here's how you set everything up:
```bash
$ git clone git@github.com:sfchronicle/pillars-among-the-ruins.git
$ cd pillars-among-the-ruins
$ mkvirtualenv pillars-among-the-ruins
$ pip install -r requirements.txt && npm install && bower install
```

### Setup database
```bash
$ python createdb.py
$ python migratedb.py db init
$ python migratedb.py db migrate
```

### Start app
```bash
$ grunt serve
```

## Explore ORM
Interact with the SQLite database by running the shell.py file:
```bash
$ ./shell.py
```

## Build and deployment
Create a `local_settings.py` file in the `settings` directory. Add the following env variables:
```python
AWS_ACCESS_KEY_ID = ''
AWS_SECRET_ACCESS_KEY = ''
```

Add the bucket and region you plan to deploy to in `production.py`. Defaults to:
```python
S3_BUCKET_NAME = 'projects.sfchronicle.com'
S3_REGION = 'us-west-1'
```

Now run `build.py` to compress assets for production and upload production files to Amazon S3
```bash
$ python build.py
```
