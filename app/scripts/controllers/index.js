'use strict';

/**
 * @ngdoc function
 * @name drr.controllers:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of drr
 */
angular.module('drr.controllers')
  .controller('IndexCtrl', ['$window', 'GoogleDrive', function ($window, GoogleDrive) {
    this.label = "Authorize";

    $window.initGapi = function() {
      GoogleDrive.checkAuth();
    }

    console.log('index.js controller')
  }]);
