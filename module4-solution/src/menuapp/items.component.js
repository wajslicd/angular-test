(function() {
  'use strict';

  angular.module('MenuApp')
  .component('items', {
    templateUrl: 'src/menuapp/templates/itemsComponent.template.html',
    // controller: ItemsComponentController,
    bindings: {
      items: '<'
    }
  });

  // function ItemsComponentController() {
  //   var $ctrl = this;
  // }


})();
