(function() {
'use strict';

angular.module("NarrowItDownApp", [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive("foundItems", FoundItems)
.constant('BasePath', "https://davids-restaurant.herokuapp.com");

function FoundItems() {
  var ddo = {
    restrict: "E",
    templateUrl: 'foundItems.html',
    scope: {
      items: '<foundItems',
      title: '@',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'foundItems',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var foundItems = this;

  foundItems.itemsInList = function () {
    if ((foundItems.items === undefined) ||
    (foundItems.items !== undefined) && (foundItems.items.length > 0))  {
      return true;
    }

    return false;
  };
}

NarrowItDownController.$inject = ['MenuSearchService']
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.searchTerm = "";

  menu.getItems = function() {
    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

    promise.then( function(response){
      menu.found = response;
    })
    .catch(function(error){
      console.log("Something went terribly wrong.");
    });
  };

  menu.removeItem = function (itemIndex) {
    menu.found.splice(itemIndex, 1);
  };

}

MenuSearchService.$inject = ['$http', 'BasePath']
function MenuSearchService($http, BasePath) {
  var service = this;

  // var foundItems = [];

  service.getMatchedMenuItems = function (searchTerm) {

    searchTerm = searchTerm.trim().toLowerCase();

    return $http({
      method: "GET",
      url: (BasePath + "/menu_items.json")
    })
    .then(function(response) {
      var foundItems = [];
      if (searchTerm) {
        for(var i = 0; i < response.data.menu_items.length; i++) {
          if( response.data.menu_items[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
            foundItems.push(response.data.menu_items[i]);
          }
        }
      }
      return foundItems;
    }).catch(function(error) {
      console.log("Error while retrieving data.");
    });

  };

}

})();
