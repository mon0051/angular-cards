'use strict';

var gulp = require('gulp');
//var prettify = require('gulp-prettify');
//var jsprettify = require('gulp-js-prettify');
var preprocess = require('gulp-preprocess');
var rename = require('gulp-rename');
var jsonutil = require('jsonutil');
var runSequence = require('run-sequence');
var es = require('event-stream');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']
});

var templateSettings = 'app/config/template.settings.js';

var config = {
  scssFiles: [
    'app/styles/main.scss',
  ]
};

gulp.task('settings:dev', function () {
  return gulp.src(templateSettings)
    .pipe(preprocess({
      context: {
        env: 'dev'
      }
    }))
    .pipe(rename('settings.js'))
    .pipe(gulp.dest('app/'));
});

gulp.task('styles', function () {
  gulp.src('app/bower_components/bootstrap-sass-official/assets/fonts/bootstrap/**').pipe(gulp.dest('app/assets/fonts/bootstrap'));

  return gulp.src(config.scssFiles)
    .pipe($.sass({
      includePaths: ['app/bower_components/bootstrap-sass-official/assets/stylesheets', 'app/bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap'],
      outputStyle: 'nested',
      onError: function(err) {
        console.log(err.message);
        console.log(err.code);
        console.log(err.line);
        console.log(err.column);
      }
    }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('app/styles/'))
    .pipe($.size());
});

gulp.task('scripts', function () {
  return gulp.src(['app/**/*.js', '!app/bower_components/**/*.js', '!app/**/*.tpl.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.size());
});

gulp.task('scripts:nofail', function () {
  return gulp.src(['app/**/*.js', '!app/bower_components/**/*.js', '!app/**/*.tpl.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.size());
});

gulp.task('partials', function () {
  return gulp.src('app/components/**/*.html')
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.ngHtml2js({
      moduleName: 'template-partials',
      prefix: '/',
    }))
    .pipe(rename(function(path){
      path.extname = '.tpl.js';
      return path;
    }))
    .pipe(gulp.dest('app/components'))
    .pipe($.size());
});

gulp.task('prettify', [ 'prettify-html', 'prettify-js']);

gulp.task('prehtml', ['partials'], function () {
  var vendor = ['app/vendor/*.js','app/bower_components/**/dist/*min.js','app/bower_components/**/*.min.js'];
  var components = require('./data/jscomponents.json');
  var vendorMain = [];

  vendor = es.concat(gulp.src(vendorMain), gulp.src(vendor).pipe($.sort()));

  var testDataRegex = /<!-- inject:testdata -->\s+(?:\s*<script src=".+"><\/script>\s*)+\s+<!-- endinject -->/g;

  var injectjs = es.concat(gulp.src('app/**/main.js'),
    gulp.src(['app/**/*.js','!app/**/*test.js', '!app/**/main.js', '!app/**/*.tpl.js','!app/**/*.spec.js', '!app/bower_components/**/*.js']).pipe($.sort()));

  return gulp.src('app/*.html')
  .pipe($.replace(testDataRegex, '<!-- inject:testdata -->\n\t<!-- endinject -->'))
  .pipe($.inject(injectjs, {
    read: false,
    starttag: '<!-- inject:js -->',
    addRootSlash: false,
    transform: function (filePath) {
      return '<script src="' + filePath.replace('app/', '') + '"></script>';
    }
  }))
  .pipe($.inject(vendor, {
    read: false,
    starttag: '<!-- inject:vendorjs -->',
    addRootSlash: false,
    transform: function (filePath) {
      return '<script src="' + filePath.replace('app/','')
               + '"></script>';
    }
  }))
  .pipe($.inject(gulp.src('app/styles/*.css').pipe($.sort()), {
      read: false,
      starttag: '<!-- inject:css -->',
      addRootSlash: false,
      transform: function (filePath) {
        return '<link rel="stylesheet" type="text/css" href="' + filePath.replace('app/','') + '"/>';
      }
  }))
  .pipe($.inject(gulp.src('app/components/**/*.tpl.js').pipe($.sort()), {
    read: false,
    starttag: '<!-- inject:partials -->',
    addRootSlash: false,
    transform: function (filePath) {
      return '<script src="' + filePath.replace('app/','') + '"></script>';
    }
  }))
  .pipe(gulp.dest('app'));
});

gulp.task('html', ['styles', 'prehtml', 'scripts'], function () {
  var assets = $.useref.assets({searchPath: ['app', '../../lib/flagship/src']});

  gulp.src('app/assets/**').pipe(gulp.dest('dist/src/assets'));//copy those assets

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe($.rev())//rev is the thing that adds hashes to the filename
    .pipe($.if('*.js', $.ngAnnotate()))
    .pipe($.if('*.js', $.uglify({  })))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});

gulp.task('prettify-html', function () {
  var options = jsonutil.readFileSync(__dirname + '/../.jsbeautifyrc');

  return gulp.src('app/**/*.html')
    .pipe($.prettify(options.html))
    .pipe(gulp.dest('app/'));
});

gulp.task('prettify-js', function () {
  var options = jsonutil.readFileSync(__dirname + '/../.jsbeautifyrc');

  return gulp.src('app/**/*.js')
    .pipe($.jsprettify(options.js))
    .pipe(gulp.dest('app/'));
});

gulp.task('clean', function () {
  return gulp.src(['.tmp', 'dist', 'app/components/**/*.tpl.js'], {
    read: false
  }).pipe($.rimraf({force: true}));
});

gulp.task('build', function (callback) {
  runSequence('clean', 'settings:dev', ['wiredep', 'html', 'images'], /*'test',*/ callback);
});

gulp.task('build:tc', function (callback) {
  runSequence('clean', 'settings:dev', ['wiredep', 'html', 'images'], /*'test:tc',*/ callback);
});
