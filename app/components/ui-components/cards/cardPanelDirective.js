(function () {
   angular
      .module('mwUiComponents')
      .directive('cardPanel', function () {
         return {
            restrict: 'E',
            scope: {
               title: '@title'
            },
            templateUrl: 'components/ui-components/cards/card-panel.html',
            //link: function (scope, element, attributes) {
            //   scope.title = attributes["title"];
            //}

         };
      });
}());