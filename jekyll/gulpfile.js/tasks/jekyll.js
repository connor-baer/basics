var gulp      = require('gulp'),
  cp          = require('child_process'),
  browsersync = require('browser-sync'),
  config      = require('../../gulpconfig').jekyll;

// Build the Jekyll Site.
gulp.task('jekyll', function(done) {
  browsersync.notify('Compiling Jekyll');

  return cp.spawn('jekyll', ['build', '-q', '--source=' + config.src, '--destination=' + config.dest, '--config=' + config.config], { stdio: 'inherit' })
  .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll'], function() {
  browsersync.reload();
});
