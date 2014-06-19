var fs = require('fs');

var browserify = require('browserify');
var sh = require('shelljs');

browserify()
  .add('./tests/tests.js')
  .bundle()
  .pipe(fs.createWriteStream('tests/build.js'))
  .once('close', function() {
    sh.exec('mocha-phantomjs -R spec tests/index.html');
  });
