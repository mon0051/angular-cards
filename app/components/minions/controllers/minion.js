(function () {
    'use strict';
    angular.module('mwMinions').controller('minionController', function ($scope,minionList) {
        $scope.minions = minionList;
        var getMinions = function(){
          return minions;
        };
    });
}());