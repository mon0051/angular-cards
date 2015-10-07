(function () {
   angular
      .module('mwUiComponents')
      .directive('cardPanel', function () {
         return {
            restrict: 'E',
            scope: {
               title: '@title',
               cost: '@cost'
            },
            templateUrl: 'components/ui-components/cards/card-panel.html'
         };
      });
}());