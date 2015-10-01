module.exports = function (config) {
    config.set({

        basePath: '../', //!\\ Ignored through gulp-karma //!\\

        files: [//!\\ Ignored through gulp-karma //!\\
            '../app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/components/**/*.js',
            'app/view*/**/*.js'
        ],

        autoWatch: false,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],
        reporters: ['progress', 'coverage'],

        preprocessors: {
            'app/!(**vendor|**bower_components)/**/!(*.spec|*.tpl).js' : ['coverage']
        },

        coverageReporter: {
            reporters:[
                {type: 'html'},
                {type: 'text-summary'}
            ]
        },
        plugins : [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-coverage'
        ]

    });
};
