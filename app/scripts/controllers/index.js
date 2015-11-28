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
    var running = false;

    $window.initGapi = function () {
      running = true;
      checkAuth(true).then(listFiles);
    };

    $rootScope.$on('$googleDrive:oauthClick', function () {
      running = true;
      checkAuth(false).then(listFiles);
    });

    function checkAuth(immediate) {
      return GoogleDrive.checkAuth(immediate);
    }

    function listFiles() {
      GoogleDrive.listFiles().then(
        function (files) {
          that.files = files;
          running = false;
        }, function (error) {
          console.log('Something went wrong getting files', error);
        });
    }

    if (!running && $window.gapiLoaded) {
      $window.initGapi();
    }

    console.log('index.js controller')
  }]);
