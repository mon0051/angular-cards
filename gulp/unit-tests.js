//'use strict';
//
//var gulp = require('gulp');
//var $ = require('gulp-load-plugins')();
//var wiredep = require('wiredep');
//var testFiles;
//
//gulp.task('preparetestfiles', function () {
//  var bowerDeps = wiredep({
//    directory: 'app/bower_components',
//    dependencies: true,
//    devDependencies: true,
//    exclude: [
//        'medium-editor.dist.css.themes',
//        'bootstrap-sass-official',
//        'jquery',
//        'bootstrap'
//        ]
//  });
//
//  testFiles = bowerDeps.js.concat([
//    'test/_.spec.js',
//    'app/**/*.tpl.js',
//    'app/**/main.js',
//    'app/**/*.js'
//
//    ]);
//});
//
//gulp.task('test', ['preparetestfiles'], function() {
//  // var bowerDeps = wiredep({
//  //   directory: 'app/bower_components',
//  //   dependencies: true,
//  //   devDependencies: true,
//  //   exclude: [
//  //       'medium-editor.dist.css.themes',
//  //       'bootstrap-sass-official',
//  //       'jquery',
//  //       'bootstrap'
//  //       ]
//  // });
//  //
//  // var testFiles = bowerDeps.js.concat([
//  //   'app/src/**/main.js',
//  //   'app/src/**/*.js',
//  //   '../../lib/flagship/src/fs-components/*/src/main.js',
//  //   '../../lib/flagship/src/fs-components/*/src/!(*.spec).js'
//  // ]);
//
//  return gulp.src(testFiles)
//    .pipe($.karma({
//      configFile: 'test/karma.conf.js',
//      action: 'run'
//    }))
//    .on('error', function(err) {
//      // Make sure failed tests cause gulp to exit non-zero
//
//    });
//});
//
//gulp.task('test:tc', ['preparetestfiles'], function() {
//  return gulp.src(testFiles)
//    .pipe($.karma({
//      configFile: 'test/karma.tc.conf.js',
//      action: 'run'
//    }))
//    .on('error', function(err) {
//      // Make sure failed tests cause gulp to exit non-zero
//      throw err;
//    });
//});
