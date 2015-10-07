(function(module) {
try {
  module = angular.module('template-partials');
} catch (e) {
  module = angular.module('template-partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/minions/templates/minion-list.html',
    '<section class="container-fluid"><div class="row"><div class="panel panel-default"><div class="panel-heading">Search: <input ng-model="query"></div><div class="content-center-wrapper"><div class="panel-body"><ul class="list-inline auto-center-list"><li class="media" ng-repeat="minion in minions | filter:query"><card-panel title="{{minion.name}}"></card-panel></li></ul></div></div></div></div></section>');
}]);
})();
