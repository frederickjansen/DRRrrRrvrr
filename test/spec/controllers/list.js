'use strict';

describe('Controller: ListCtrl', function () {

  // load the controller's module
  beforeEach(module('drr'));

  var ListCtrl,
    GoogleDrive,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, $controller, $q) {

    GoogleDrive = {
      listFiles: function () {
      },
      checkAuth: function () {
      }
    };

    spyOn(GoogleDrive, 'listFiles').and.callFake(function () {
      var def = $q.defer();
      def.resolve('files');
      return def.promise;
    });
    spyOn(GoogleDrive, 'checkAuth').and.callFake(function () {
      var def = $q.defer();
      def.resolve();
      return def.promise;
    });

    scope = $rootScope.$new();

    ListCtrl = $controller('ListCtrl', {
      $scope: scope,
      GoogleDrive: GoogleDrive
    });
  }));

  describe('listFiles', function () {
    it('should not be called when gapi is undefined', function () {
      expect(GoogleDrive.listFiles).not.toHaveBeenCalled();
    });

    it('should be called after gApiLoaded broadcast', function () {
      scope.$broadcast('$index:gApiLoaded');
      expect(GoogleDrive.listFiles).toHaveBeenCalled();
    });

    it('should be called with no parameters', function () {
      scope.$broadcast('$index:gApiLoaded');
      expect(GoogleDrive.listFiles).toHaveBeenCalledWith();
    });

    it('should set files property', function () {
      scope.$broadcast('$index:gApiLoaded');
      scope.$apply();
      expect(ListCtrl.files).toBe('files');
    });
  });

  describe('oauthClick', function () {
    beforeEach(inject(function ($rootScope) {
      $rootScope.$broadcast('$googleDrive:oauthClick');
    }));

    it('should call checkAuth', function () {
      expect(GoogleDrive.checkAuth).toHaveBeenCalledWith(false);
    });

    it('should call listFiles', function () {
      scope.$apply();
      expect(GoogleDrive.listFiles).toHaveBeenCalled();
    });
  });
});
