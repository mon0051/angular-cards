'use strict';

var gulp = require('gulp');

gulp.task('watch', ['wiredep', 'styles'] ,function () {
  gulp.watch(['app/src/**/*.scss', 'app/styles/*.scss'], ['styles']);
  gulp.watch('app/src/**/*.js', ['prehtml', 'scripts:nofail']);
  gulp.watch('app/src/components/**/*.html', ['partials']);
  gulp.watch('../../lib/flagship/src/fs-components/**/*.html', ['partials-fs-components']);
  gulp.watch('app/images/**/*', ['images']);
  gulp.watch('bower.json', ['wiredep']);
});
