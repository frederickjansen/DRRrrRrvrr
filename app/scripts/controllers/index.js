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
      checkAuth();
    };

    $rootScope.$on('$googleDrive:oauthClick', function() {
      checkAuth();
    });

    function checkAuth() {
      GoogleDrive.checkAuth().then(function () {
        console.log('auth done')
      });
    }
    console.log('index.js controller')
  }]);
