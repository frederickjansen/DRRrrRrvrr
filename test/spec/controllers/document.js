'use strict';

describe('Controller: DocumentCtrl', function () {

  // load the controller's module
  beforeEach(module('drr'));

  var DocumentCtrl,
    GoogleDrive,
    ZombieTranslator,
    scope,
    stateParams;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, $controller, $q) {

    GoogleDrive = {
      displayFile: function() {}
    };

    ZombieTranslator = {
      translate: function() {}
    };

    spyOn(GoogleDrive, 'displayFile').and.callFake(function () {
      var def = $q.defer();
      def.resolve('file');
      return def.promise;
    });
    spyOn(ZombieTranslator, 'translate').and.callFake(function () {
      var deferred = $q.defer();
      deferred.resolve('translation');
      return deferred.promise;
    });

    scope = $rootScope.$new();
    stateParams = {id: 1};

    DocumentCtrl = $controller('DocumentCtrl', {
      $scope: scope,
      $stateParams: stateParams,
      GoogleDrive: GoogleDrive,
      ZombieTranslator: ZombieTranslator
    });
  }));

  describe('displayFile', function () {
    it('should not be called when gapi is undefined', function () {
      expect(GoogleDrive.displayFile).not.toHaveBeenCalled();
    });

    it('should be called after gApiLoaded broadcast', function () {
      scope.$broadcast('$index:gApiLoaded');
      expect(GoogleDrive.displayFile).toHaveBeenCalled();
    });

    it('should be called with state params', function () {
      scope.$broadcast('$index:gApiLoaded');
      expect(GoogleDrive.displayFile).toHaveBeenCalledWith(1);
    });
  });

  describe('zombieTranslator', function () {
    beforeEach(inject(function ($rootScope) {
      scope.$broadcast('$index:gApiLoaded');
      $rootScope.$apply();
    }));

    it('should be called', inject(function ($rootScope) {

      expect(ZombieTranslator.translate).toHaveBeenCalled();
    }));

    it('should be called with file', inject(function ($rootScope) {
      expect(ZombieTranslator.translate).toHaveBeenCalledWith('file');
    }));

    it('should set zombieTranslation', inject(function ($rootScope) {
      expect(DocumentCtrl.zombieTranslation).toBe('translation');
    }));
  });
});
