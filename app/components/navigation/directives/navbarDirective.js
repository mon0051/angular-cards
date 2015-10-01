'use strict';
angular
    .module('sandbox')
    .directive('mwNavbar', function () {
        return{
            templateUrl:'/components/navigation/directives/navbar.html',
            replace:true
        };
    });
