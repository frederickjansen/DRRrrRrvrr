'use strict';

/**
 * @ngdoc function
 * @name drr.controllers:DocumentCtrl
 * @description
 * # DocumentCtrl
 * Controller of drr
 */
angular.module('drr.controllers')
  .controller('DocumentCtrl', ['$stateParams', 'GoogleDrive', 'ZombieTranslator',
    function ($stateParams, GoogleDrive, ZombieTranslator) {
      var that = this;

      if ($stateParams && $stateParams.id) {
        GoogleDrive.displayFile($stateParams.id).then(function (file) {
          ZombieTranslator.translate(file).then(function (translation) {
            that.zombieTranslation = translation;
            console.log(translation);
          });
        });
      }
    }]);
