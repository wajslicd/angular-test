describe('menuservice', function() {
  var menuservice;
  var $httpBackend;
  var ApiBasePath;

  beforeEach(function() {
    module('common');

    module(function ($provide) {
      $provide.factory('loadingHttpInterceptor', function() {
        return { request: null, response: null, responseError: null }
      });
    });

    inject(function($injector) {
      menuservice = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiBasePath = $injector.get('ApiPath');
    });
  });

  it('should return categories list', function() {
    $httpBackend.whenGET(ApiBasePath + '/categories.json')
    .respond([{id:82,short_name:"A",name:"Soup"},
              {id:81,short_name:"L",name:"Lunch"}]);

    menuservice.getCategories().then(function(response) {
      console.log(response);
      expect(response).toEqual([{id:82,short_name:"A",name:"Soup"},
                                {id:81,short_name:"L",name:"Lunch"}]);
    });
    $httpBackend.flush();
  });

  it('should return menu items list for category', function() {
    var category = "L";

    $httpBackend.whenGET(ApiBasePath + '/menu_items.json?category=' + category)
    .respond([{id:877, short_name: "A1", name: "Won Ton Soup with Chicken"},
              {id:878, short_name: "A2", name: "Egg Drop Soup"}]);

    menuservice.getMenuItems(category).then(function(response) {
      console.log(response);
      expect(response).toEqual([{id:877, short_name: "A1", name: "Won Ton Soup with Chicken"},
                                {id:878, short_name: "A2", name: "Egg Drop Soup"}]);
    });
    $httpBackend.flush();
  });

  it('should return a single menu item', function() {
    var shortName = 'A2';

    $httpBackend.whenGET(ApiBasePath + '/menu_items/' + shortName + '.json')
    .respond([{id: 2, short_name: 'A2', name: 'Egg Drop Soup', description: 'chicken broth with egg drop'}]);

    menuservice.getMenuItem(shortName).then(function(response) {
      console.log(response);
      expect(response).toEqual([{id: 2, short_name: 'A2', name: 'Egg Drop Soup', description: 'chicken broth with egg drop'}]);
    });
    $httpBackend.flush();
  });

});
