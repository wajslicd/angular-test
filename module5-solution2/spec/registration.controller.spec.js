describe("RegistrationController", function() {
  beforeEach(function() {
      module('public');

      module(function ($provide) {
        $provide.factory('loadingHttpInterceptor', function() {
          return { request: null, response: null, responseError: null }
        });
      });

      module(function ($provide) {
        $provide.service('registrationServiceMock', function() {
          return null;
        });
      });

      module(function ($provide) {
        $provide.service('menuServiceMock', function () {
          var service = this;

          service.getMenuItem = function (shortName) {
            if(shortName === 'A1') {
              return Promise.resolve({id: 1, short_name: 'A1', name: 'Won Ton Soup with Chicken'});
            }
            else {
              return Promise.reject({status:"500",error:"Internal Server Error"});
            }
          };
        });
      });

    });

  var $controller;
  var registrationController;

  beforeEach(inject(function(_$controller_, menuServiceMock, registrationServiceMock) {
    $controller = _$controller_;

    // var registrationServiceMock = {};

    registrationController = $controller('RegistrationController', {MenuService: menuServiceMock},
        {RegistrationService: registrationServiceMock});

  }));

  it("should set menuError to false", function(done) {
    registrationController.verifyFavourite('A1').then(function(response){
      console.log(registrationController.menuError);
      expect(registrationController.menuError).toBe(false);
      done();
    });
  });

  it("should populate user.item with data", function(done) {
    registrationController.verifyFavourite('A1').then(function(response){
      console.log(registrationController.user.item);
      expect(registrationController.user.item).toEqual({id: 1, short_name: 'A1', name: 'Won Ton Soup with Chicken'});
      done();
    });
  });

  it("should set menuError to true", function(done) {
    registrationController.verifyFavourite('xy').then(function(response){
      console.log(registrationController.menuError);
      expect(registrationController.menuError).toBe(true);
      done();
    });
  });

});
