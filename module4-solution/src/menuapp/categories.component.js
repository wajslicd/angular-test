(function() {
  'use strict';

  angular.module('MenuApp')
  .component('categories', {
    templateUrl: 'src/menuapp/templates/categoriesComponent.template.html',
    // controller: CategoriesComponentController,
    bindings: {
      items: '<'
      // categoriesTitle: '@title',
    }
  });

  // function CategoriesComponentController() {
  //   var $ctrl = this;
  // }


})();
