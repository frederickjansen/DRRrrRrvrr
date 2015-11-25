'use strict';

angular.module('drr.services')
  .factory('GoogleDrive', ['$q', 'CONFIG', function ($q, CONFIG) {
    var googleDrive = {};
    console.log('googleDrive service')

    googleDrive.checkAuth = function () {
      var deferred = $q.defer();
      gapi.auth.authorize(
        {client_id: CONFIG.CLIENT_ID, scope: CONFIG.SCOPES, immediate: false}, function (authResult) {
          if (authResult && !authResult.error) {
            deferred.resolve();
          } else {
            deferred.reject(authResult.error);
          }
        });
      return deferred.promise;
    };
    }

    googleDrive.handleAuthClick = function (event) {
      gapi.auth.authorize(
        {client_id: CONFIG.CLIENT_ID, scope: CONFIG.SCOPES, immediate: false},
        handleAuthResult);
      return false;
    }

    function handleAuthResult() {
      return true;
    }

    return googleDrive;
  }]);
