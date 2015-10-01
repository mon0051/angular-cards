(function () {
   angular
      .module('mwRoute')
      .config(

         function ($routeProvider) {
            $routeProvider
               .when('/minions', {
                  templateUrl: '/components/minions/templates/minion-list.html',
                  controller: 'minionController'
               })
               .otherwise({redirectTo: '/'});
         }

   );
}());