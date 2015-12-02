'use strict';

/**
 * @ngdoc function
 * @name drr.controllers:DocumentCtrl
 * @description
 * # DocumentCtrl
 * Controller of drr
 */
angular.module('drr.controllers')
  .controller('DocumentCtrl', ['$scope', '$stateParams', 'GoogleDrive', 'ZombieTranslator',
    function ($scope, $stateParams, GoogleDrive, ZombieTranslator) {
      var that = this;

      function displayFile() {
        if ($stateParams && $stateParams.id) {
          GoogleDrive.displayFile($stateParams.id).then(function (file) {
            ZombieTranslator.translate(file).then(function (translation) {
              that.zombieTranslation = translation;
              console.log(translation);
            });
          });
        }
      }

      // If gapi is loaded, we're coming from index page
      if (gapi && gapi.client) {
        displayFile();
      }

      $scope.$on('$index:gApiLoaded', function () {
        displayFile();
      });

    }]);
