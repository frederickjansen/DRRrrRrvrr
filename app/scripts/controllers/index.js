'use strict';

/**
 * @ngdoc function
 * @name drr.controllers:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of drr
 */
angular.module('drr.controllers')
  .controller('IndexCtrl', ['$scope', '$window', 'GoogleDrive',
    function ($scope, $window, GoogleDrive) {

      $window.initGapi = function () {
        checkAuth(true).then(gApiLoaded);
      };

      function gApiLoaded() {
        $scope.$broadcast('$index:gApiLoaded');
      }

      function checkAuth(immediate) {
        return GoogleDrive.checkAuth(immediate);
      }

      console.log('index.js controller');
    }]);
