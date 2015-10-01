'use strict';

angular.module('sandbox.version', [
  'sandbox.version.interpolate-filter',
  'sandbox.version.version-directive'
])

.value('version', '0.1');
