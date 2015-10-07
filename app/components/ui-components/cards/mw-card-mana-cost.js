(function () {
   angular.
      module('mwUiComponents')
      .directive('mwCardManaCost', function () {
         return {
            scope:{value:'@cost'},
            template: '<div>{{value}}</div>'
         }
      });
}());