(function () {
  'use strict';

  angular.module('public')
  .directive('favourite', favourite);

  favourite.$inject = ['$q', 'MenuService']
  function favourite($q, MenuService) {
    return {
      restrict: 'A',
      require: 'ngModel',
      // controller: 'RegistrationController as ctrl',
      link: VerifyFavouriteLink

    };
  }

  function VerifyFavouriteLink(scope, element, attrs, ngModel) {
    ngModel.$asyncValidators.favourite = function(modelValue, viewValue) {

      if (ngModel.$isEmpty(modelValue)) {
        // empty model
        return $q.reject();
      }
      else {
        return MenuService.getMenuItem(modelValue)
        .then(function(response) {
          if (!response.data.status) {
            return $q.reject();
          }
          return true;
        });

      }
    };
  }
})();
