var commonConf = require('./karma.conf.js');

module.exports = function(config) {
  'use strict';

  commonConf(config);

  config.set({
    reporters: ['progress', 'coverage', 'teamcity'],

    coverageReporter: {
      reporters:[
      {type: 'html'},
      {type: 'teamcity'},
      {type: 'text-summary'}
      ]
    },

    plugins : [
        'karma-teamcity-reporter',
        'karma-phantomjs-launcher',
        'karma-jasmine',
        'karma-coverage'
    ]
  });
};
