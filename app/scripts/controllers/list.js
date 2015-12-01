'use strict';

/**
 * @ngdoc function
 * @name drr.controllers:ListCtrl
 * @description
 * # ListCtrl
 * Controller of drr
 */
angular.module('drr.controllers')
  .controller('ListCtrl', ['$scope', '$rootScope', '$window', 'GoogleDrive',
    function ($scope, $rootScope, $window, GoogleDrive) {
      this.label = "Authorize";
      var that = this;

      $rootScope.$on('$googleDrive:oauthClick', function () {
        checkAuth(false).then(listFiles);
      });

      $scope.$on('$index:gApiLoaded', function () {
        listFiles();
      });

      function checkAuth(immediate) {
        return GoogleDrive.checkAuth(immediate);
      }

      function listFiles() {
        GoogleDrive.listFiles().then(
          function (files) {
            that.files = files;
          }, function (error) {
            console.log('Something went wrong getting files', error);
          });
      }

      console.log('list.js controller')
    }]);
