(function () {
   angular
      .module('mwUiComponents')
      .directive('mwCardImage', function () {
         return{
            attributes:'E',
            replace:true,
            templateUrl:'components/ui-components/cards/card-panel-image.html'
         }
      });
}());