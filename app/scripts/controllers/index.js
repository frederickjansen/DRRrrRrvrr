'use strict';

/**
 * @ngdoc function
 * @name drr.controllers:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of drr
 */
angular.module('drr.controllers')
  .controller('IndexCtrl', ['$rootScope', '$window', 'GoogleDrive', function ($rootScope, $window, GoogleDrive) {
    this.label = "Authorize";
    var that = this;

    $window.initGapi = function () {
      checkAuth(true).then(listFiles);
    };

    $rootScope.$on('$googleDrive:oauthClick', function () {
      checkAuth(false).then(listFiles);
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

    console.log('index.js controller')
  }]);
