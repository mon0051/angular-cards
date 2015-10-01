(function(module) {
try {
  module = angular.module('template-partials');
} catch (e) {
  module = angular.module('template-partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/ui-components/cards/card-panel.html',
    '<div class="mw-card-panel"><div class="mw-card-panel-top"><div class="mw-card-panel-image"></div></div><div class="mw-card-panel-bottom"><div class="mw-card-panel-title h4">{{title}}</div></div></div>');
}]);
})();
