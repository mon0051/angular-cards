(function () {
  'use strict';
  /* globals beforeEach */

  var windowMock;
  beforeEach(function() {
    windowMock = { localStorage : {} };

    module(function ($provide) {
      $provide.value('$window', windowMock);
    });
  });
})();
