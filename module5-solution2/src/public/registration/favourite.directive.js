(function () {
  'use strict';

  angular.module('public')
  .directive('validateFavourite', ValidateFavourite);

  ValidateFavourite.$inject = ['$q', 'MenuService']
  function ValidateFavourite($q, MenuService) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {

        ngModel.$asyncValidators.favourite = function(modelValue, viewValue) {

          var def = $q.defer();

          MenuService.getMenuItem(modelValue)
          .then(function(response) {
            def.resolve();
            scope.regCtrl.user.item = response;
          })
          .catch(function (error) {
            def.reject();
          });
          // console.log("Link scope is: ", scope);
          // console.log("Controller instance is: ", ngModel);
          // console.log("Element is: ", element);
          // console.log("Attributes is: ", attrs);
          return def.promise;
        };

      }
    }
  }
})();

// VerifyFavouriteLink
