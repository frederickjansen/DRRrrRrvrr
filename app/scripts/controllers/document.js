'use strict';

/**
 * @ngdoc function
 * @name drr.controllers:DocumentCtrl
 * @description
 * # DocumentCtrl
 * Controller of drr
 */
angular.module('drr.controllers')
  .controller('DocumentCtrl', ['$stateParams', function ($stateParams) {
    console.log($stateParams);
  }]);
