(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getItemsToBuy();

    toBuy.moveItem = function (itemIndex) {
      ShoppingListCheckOffService.moveItem(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;

    bought.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var itemsToBuy = [
      { name: "Bread", qty: 1 },
      { name: "Meat", qty: 5 },
      { name: "Chocolate", qty: 2 },
      { name: "Chips", qty: 4 },
      { name: "Muesli", qty: 2 }
    ];
    var itemsBought = [];

    service.addItemToBuy = function(itemName, quantity) {
      var item = {
        name: itemName,
        qty: quantity
      };
      itemsToBuy.push(item);
    };

    service.getItemsToBuy = function() {
      return itemsToBuy;
    };

    service.getBoughtItems = function() {
      return itemsBought;
    };

    service.moveItem = function(itemIndex) {
      var bought = itemsToBuy[itemIndex];
      itemsToBuy.splice(itemIndex, 1);
      itemsBought.push(bought);
    };
  }

})();
