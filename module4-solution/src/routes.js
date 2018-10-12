(function() {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');
    // Set up UI states
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/menuapp/templates/home.template.html'
    })
    .state('categories', {
      url: '/categories',
      templateUrl: 'src/menuapp/templates/categories.template.html',
      controller: 'CategoriesController as categoriesList',
      resolve: {
        categories: ['MenuDataService', function(MenuDataService) {
          return MenuDataService.getAllCategories()
          .catch(function(error) {
            console.log("Cannot retrieve categories");
          });
        }]
      }
    })
    .state('items', {
      url: '/items/{category}',
      templateUrl: 'src/menuapp/templates/items.template.html',
      controller: 'ItemsController as menuItems',
      resolve: {
        items: ['$stateParams', 'MenuDataService',
         function($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.category)
          .then(function(response) {
            return response.data;
          })
          .catch(function(error) {
            console.log("Cannot retrieve menu items");
          });
        }]
      }
    });
  }

})();
