angular.module('drr.services')
  .factory('GoogleDrive', ['CONFIG', function (CONFIG) {
    var googleDrive = {};
    console.log('googleDrive service')

    googleDrive.checkAuth = function () {
      gapi.auth.authorize(
      {
        'client_id': CONFIG.CLIENT_ID,
        'scope': CONFIG.SCOPES.join(' '),
        'immediate': true
      }, handleAuthResult);
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
