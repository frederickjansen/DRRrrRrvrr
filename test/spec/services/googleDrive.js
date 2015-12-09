'use strict';

describe('Service: GoogleDrive', function () {
  var GoogleDrive,
    $httpBackend,
    gapi,
    url = 'https://localhost/gapi';

  beforeEach(module('drr'));

  beforeEach(
    module(['$provide', function ($provide) {
      $provide.constant('CONFIG', {
        'CLIENT_ID': '123',
        'SCOPES': ['https://www.googleapis.com/auth/drive.readonly']
      });
    }])
  );

  beforeEach(inject(function ($rootScope, $controller, $q, $injector, $httpBackend) {
    gapi = {
      auth: {
        getToken: function () {
          return {
            access_token: '123'
          };
        }
      },
      client: {
        load: function () {},
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
    spyOn(gapi.auth, 'getToken').and.callThrough();

    $httpBackend.when('GET', url)
      .respond(200, 'File contents');

    GoogleDrive = $injector.get('GoogleDrive');
    $httpBackend = $injector.get('$httpBackend');
  }));

  describe('displayFiles', function () {
    it('should display files', function () {
      // service returns a promise
      GoogleDrive.displayFile(1)
        .then(function (response) {
          expect(response).toBe('File contents');
        });
      // flushes pending requests
      $httpBackend.flush();
    });
  });
});
