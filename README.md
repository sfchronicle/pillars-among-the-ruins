# Pillars Among the Ruins
Description TK

### Requirements
- Python 2.7.x
- Node.js 0.12
  - uglifyjs (`npm install -g uglifyjs`)
  - clean-css (`npm install -g cleancss`)
  - Bower and Grunt (`$ npm install -g grunt-cli bower`)

### Installation
```bash
$ git clone git@github.com:sfchronicle/pillars-among-the-ruins.git
$ cd pillars-among-the-ruins
$ mkvirtualenv pillars-among-the-ruins
$ pip install -r requirements.txt && npm install && bower install
$ grunt serve  # visit localhost:5000 in your browser
```

### Start project
```bash
$ cd path/to/pillars-among-the-ruins/
$ workon pillars-among-the-ruins # or whatever you named the environment
$ grunt serve
```

## Structure
Coming soon.

### Build and deployment
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

## Contributing
1. Fork it.
2. Create a branch (`git checkout -b username-patch-n`)
3. Commit your changes (`git commit -am "Added support for MovableType"`)
4. Push to the branch (`git push origin username-patch-n`)
5. Open a [Pull Request](https://help.github.com/articles/creating-a-pull-request/)
6. Enjoy some [artisanal toast](https://www.eater.com/2014/5/30/6215971/artisanal-toast-is-taking-the-nation-by-storm)
