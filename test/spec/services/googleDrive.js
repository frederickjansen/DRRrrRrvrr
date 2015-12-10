'use strict';

var gapi;

describe('Service: GoogleDrive', function () {
  var GoogleDrive,
    $httpBackend,
    $rootScope,
    url = 'https://localhost/gapi';

  beforeEach(module('drr'));

  beforeEach(function () {
      module(['$provide', function ($provide) {
        $provide.constant('CONFIG', {
          'CLIENT_ID': '123',
          'SCOPES': ['https://www.googleapis.com/auth/drive.readonly']
        });
      }]);
    }
  );

  beforeEach(inject(function ($injector) {
    gapi = {
      auth: {
        authorize: function (object, callback) {
          callback({});
        },
        getToken: function () {
          return {
            access_token: '123'
          };
        }
      },
      client: {
        load: function (api, version, callback) {
          callback();
        },
        drive: {
          files: {
            list: function () {
              return {
                execute: function (callback) {
                  callback({items: [1, 2, 3]});
                }
              };
            },
            get: function (fileId) {
              return {
                execute: function (callback) {
                  callback({
                    exportLinks: {
                      'text/plain': url
                    }
                  });
                }
              };
            }
          }
        }
      }
    };

    spyOn(gapi.client.drive.files, 'get').and.callThrough();
    spyOn(gapi.client, 'load').and.callThrough();
    spyOn(gapi.auth, 'authorize').and.callThrough();
    spyOn(gapi.auth, 'getToken').and.callThrough();

    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    GoogleDrive = $injector.get('GoogleDrive');

    $httpBackend.when('GET', url)
      .respond(200, 'File contents');
  }));

  describe('checkAuth', function () {
    it('should call gapi.auth.authorize with immediate true', function () {
      GoogleDrive.checkAuth(true);
      expect(gapi.auth.authorize).toHaveBeenCalledWith({
        client_id: '123',
        scope: 'https://www.googleapis.com/auth/drive.readonly',
        immediate: true
      }, jasmine.any(Function));
    });

    it('should call gapi.auth.authorize with immediate false', function () {
      GoogleDrive.checkAuth(false);
      expect(gapi.auth.authorize).toHaveBeenCalledWith({
        client_id: '123',
        scope: 'https://www.googleapis.com/auth/drive.readonly',
        immediate: false
      }, jasmine.any(Function));
    });

    it('should resolve promise true when no error', function () {
      GoogleDrive.checkAuth(true)
        .then(function (response) {
          expect(response).toBe(true);
        }, function (response) {
          // If this is called, the error is triggered when it shouldn't be
          expect(1).toBe('Error message called when success should have happened');
        });
      $rootScope.$apply();
    });

    it('should resolve promise with error code when authResult.error', function () {
      // Response should now be error
      gapi.auth.authorize = function (object, callback) {
        callback({error: 'Error message'});
      };
      GoogleDrive.checkAuth(true)
        .then(function (response) {
          // If this is called, the error is triggered when it shouldn't be
          expect(1).toBe('Success message called when error should have happened');
        }, function (response) {
          expect(response).toBe('Error message');
        });
      $rootScope.$apply();
    });
  });

  describe('listFiles', function () {
    it('should call gapi.client.load with drive api v2', function () {
      GoogleDrive.listFiles();
      expect(gapi.client.load).toHaveBeenCalledWith('drive', 'v2', jasmine.any(Function));
      $rootScope.$apply();
    });

    it('should return list of files', function () {
      GoogleDrive.listFiles()
        .then(function (response) {
          expect(response).toEqual([1, 2, 3]);
        });
      $rootScope.$apply();
    });

    it('should return error when no files found', function () {
      gapi.client.drive.files.list = function () {
        return {
          execute: function (callback) {
            callback({});
          }
        }
      };
      GoogleDrive.listFiles()
        .then(function (response) {
          expect(response).toEqual([{ title: 'No files found'}]);
        });
      $rootScope.$apply();
    });
  });


  describe('displayFiles', function () {
    it('should call gapi.client.load with drive api v2', function () {
      GoogleDrive.displayFile(1);
      $httpBackend.flush();
      expect(gapi.client.load).toHaveBeenCalledWith('drive', 'v2', jasmine.any(Function));
    });

    it('should display file', function () {
      GoogleDrive.displayFile(1)
        .then(function (response) {
          expect(response).toBe('File contents');
        });
      $httpBackend.flush();
    });
  });
});
