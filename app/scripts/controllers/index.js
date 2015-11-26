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

    $window.initGapi = function() {
      checkAuth(true);
    };

    $rootScope.$on('$googleDrive:oauthClick', function() {
      checkAuth(false);
    });

    function checkAuth() {
      GoogleDrive.checkAuth().then(function () {
        GoogleDrive.listFiles().then(function (files) {
          console.log(files);
        });
      });
    }
    console.log('index.js controller')
  }]);
