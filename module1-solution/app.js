(function () {
  'use strict'

  angular.module('LunchCheck', [])
   .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.lunch_items = '';
    $scope.printMessage = '';
    $scope.myStyle = {"color":"green"};

    $scope.checkIfTooMuch = function () {
      $scope.printMessage = calculateString($scope.lunch_items);
    };

    function calculateString(lunchString) {
      var items = '';
      var count = 0;
      var message = '';

      items = lunchString.split(',');
      for (var i = 0; i < items.length; i++) {
        if (items[i].trim() != '') {
          count++;
        }
      }
      if (count == 0) {
        $scope.myStyle = {"color":"red",
                          "border": "1px",
                          "border-style": "solid",
                          "border-color":"red"};

        message = "Please enter data first";
      }
      else {
        $scope.myStyle = {"color":"green",
                          "border": "1px",
                          "border-style": "solid",
                          "border-color":"green"};

        if (count > 3) {
          message = "Too much!";
        }
        else {
          message = "Enjoy!";
        }
      }

      return message;
    }
  }
})();
