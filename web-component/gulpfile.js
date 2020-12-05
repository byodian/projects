var reload = browserSync.reload();
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('*.html').on('change', reload);
  gulp.watch('*.css').on('change', reload);
  gulp.watch('*.js').on('change', reload);
});