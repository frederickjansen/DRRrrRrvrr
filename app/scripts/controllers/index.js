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
      var running = false;

      $window.initGapi = function () {
        running = true;
        checkAuth(true).then(gApiLoaded);
      };

      function gApiLoaded() {
        $scope.$broadcast('$index:gApiLoaded');
        running = false;
      }

      function checkAuth(immediate) {
        return GoogleDrive.checkAuth(immediate);
      }

      if (!running && $window.gapiLoaded) {
        $window.initGapi();
      }

      console.log('index.js controller')
    }]);
