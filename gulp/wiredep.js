'use strict';

var gulp = require('gulp');

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
        directory: 'app/bower_components',
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      directory: 'app/bower_components',
      fileTypes: {
        html: {
          replace: {
            js: function(filePath) {
              return '<script src="' + filePath + '"></script>';
            },
            css: function(filePath) {
              return '<link rel="stylesheet" href="' + filePath + '"/>';
            },
            scss: function(filePath) {
              return '<link rel="stylesheet" href="' + filePath + '"/>';
            }
          }
        }
      },
      exclude: [
        'medium-editor.dist.css.themes',
        'bootstrap-sass-official',
        'angular-loading-bar/*.css',
        'jquery',
        'bootstrap'
        ],
    }))
    .pipe(gulp.dest('app'));
});
