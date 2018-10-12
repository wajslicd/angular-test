(function() {
  'use strict';

  angular.module('MenuApp')
  .controller('CategoriesController', CategoriesController);

  // MainCategoriesController.$inject = ['MenuDataService'];
  // function MainCategoriesController(MenuDataService) {
  CategoriesController.$inject = ['categories'];
  function CategoriesController(categories) {
    var categoriesList = this;

    categoriesList.items = categories.data;
  
  }

})();
