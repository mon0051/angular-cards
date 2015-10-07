(function(module) {
try {
  module = angular.module('template-partials');
} catch (e) {
  module = angular.module('template-partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/ui-components/cards/card-panel.html',
    '<div mw-golden-border=""><div class="mw-card-panel"><mw-card-mana-cost cost="{{cost}}"></mw-card-mana-cost><div class="mw-card-panel-top"><mw-card-image></mw-card-image></div><div class="mw-card-panel-bottom"><div class="mw-card-panel-title h4">{{title}}</div></div></div></div>');
}]);
})();
