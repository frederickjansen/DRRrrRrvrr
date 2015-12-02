'use strict';

angular.module('drr.services')
  .factory('ZombieTranslator', ['$http', 'CONFIG', function ($http, CONFIG) {
    var zombieTranslator = {};
    console.log('zombieTranslator service');

    /**
     * Login using Google OAuth
     * @param text
     * @returns promise
     */
    zombieTranslator.translate = function (text) {
      return $http({
        url: CONFIG.TRANSLATION_URL + encodeURIComponent(text),
        type: 'GET'
      }).then(function successCallback(data) {
        return data.data.message.replace(/\n/g, "<br>");
      }, function errorCallback(error) {
        return error;
      });
    };

    return zombieTranslator;
  }]);
