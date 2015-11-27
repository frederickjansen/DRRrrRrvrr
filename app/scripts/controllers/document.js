'use strict';

/**
 * @ngdoc function
 * @name drr.controllers:DocumentCtrl
 * @description
 * # DocumentCtrl
 * Controller of drr
 */
angular.module('drr.controllers')
  .controller('DocumentCtrl', ['$stateParams', 'GoogleDrive', function ($stateParams, GoogleDrive) {
    console.log($stateParams);
    if ($stateParams && $stateParams.id) {
      GoogleDrive.displayFile($stateParams.id).then(function (file) {
        console.log(file);
      });
    }
  }]);
