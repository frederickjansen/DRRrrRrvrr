'use strict';

describe('Service: ZombieTranslator', function () {
  var ZombieTranslator,
    $httpBackend,
    handler,
    response = {message: 'translated'};

  beforeEach(module('drr'));

  beforeEach(function () {

    // Mock CONFIG file
    module(['$provide', function ($provide) {
      $provide.constant('CONFIG', {
        'TRANSLATION_URL': 'http://ancient-anchorage-9224.herokuapp.com/zombify?q='
      });
    }]);

    inject(function ($injector) {

      ZombieTranslator = $injector.get('ZombieTranslator');
      // set up the mock http service
      $httpBackend = $injector.get('$httpBackend');

      // backend definition common for all tests
      handler = $httpBackend.whenGET('http://ancient-anchorage-9224.herokuapp.com/zombify?q=test')
        .respond(response);
    });
  });

  it('should return translation on 200 status', function () {
    // service returns a promise
    ZombieTranslator.translate('test')
      .then(function (translation) {
        expect(translation).toBe(response.message);
      });
    // flushes pending requests
    $httpBackend.flush();
  });

  it('should return error on 401 status', function () {
    handler.respond(401, 'error');
    // service returns a promise
    ZombieTranslator.translate('test')
      .then(function (response) {
        expect(response).toBe('error');
      });
    // flushes pending requests
    $httpBackend.flush();
  });
});
