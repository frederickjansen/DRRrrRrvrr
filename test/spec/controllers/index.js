'use strict';

describe('Controller: IndexCtrl', function () {

  // load the controller's module
  beforeEach(module('drr'));

  var IndexCtrl,
    GoogleDrive,
    window,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, $controller, $q) {
    GoogleDrive = {
      checkAuth: function() {}
    };

    window = {
      initGapi: function () {}
    };

    scope = {
      $broadcast: function () {}
    };

    spyOn(scope, '$broadcast').and.callThrough();

    spyOn(window, 'initGapi').and.callThrough();

    spyOn(GoogleDrive, 'checkAuth').and.callFake(function () {
      var def = $q.defer();
      def.resolve('file');
      return def.promise;
    });

    IndexCtrl = $controller('IndexCtrl', {
      $scope: scope,
      $window: window,
      GoogleDrive: GoogleDrive
    });

  }));

  describe('initGapi', function () {
    beforeEach(inject(function($rootScope) {
      window.initGapi();
      $rootScope.$apply();
    }));

    it('should call checkAuth', function () {
      expect(GoogleDrive.checkAuth).toHaveBeenCalledWith(true);
    });

    it('should trigger gApiLoaded broadcast', function () {
      expect(scope.$broadcast).toHaveBeenCalledWith('$index:gApiLoaded')
    });
  });
});
