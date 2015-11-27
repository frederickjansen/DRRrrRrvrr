'use strict';

angular.module('drr.services')
  .factory('GoogleDrive', ['$q', 'CONFIG', function ($q, CONFIG) {
    var googleDrive = {};
    console.log('googleDrive service');

    /**
     * Login using Google OAuth
     * @param immediate
     * @returns promise
     */
    googleDrive.checkAuth = function (immediate) {
      var deferred = $q.defer();
      gapi.auth.authorize(
        {client_id: CONFIG.CLIENT_ID, scope: CONFIG.SCOPES.join(' '), immediate: immediate}, function (authResult) {
          if (authResult && !authResult.error) {
            deferred.resolve();
          } else {
            deferred.reject(authResult.error);
          }
        });
      return deferred.promise;
    };

    /**
     * Load Drive API client library.
     */
    googleDrive.listFiles = function () {
      var deferred = $q.defer();
      gapi.client.load('drive', 'v2', function () {
        var request = gapi.client.drive.files.list({
          'maxResults': 10,
          'q': "mimeType = 'application/vnd.google-apps.document'"
        });

        request.execute(function (resp) {
          var files = resp.items;
          if (files && files.length > 0) {
            deferred.resolve(files);
          } else {
            deferred.resolve([{title: 'No files found'}]);
          }
        });
      });

      return deferred.promise;
    };
    }

    function handleAuthResult() {
      return true;
    }

    return googleDrive;
  }]);
