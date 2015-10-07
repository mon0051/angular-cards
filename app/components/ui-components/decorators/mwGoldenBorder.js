(function () {
   angular.
      module('mwUiComponents')
      .directive('mwGoldenBorder', function () {
         return {
            restrict:'EA',
            transclude:true,
            replace: true,
            templateUrl: 'components/ui-components/decorators/mw-golden-border.html'
         }
      });
}());