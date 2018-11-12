(function () {
"use strict";

angular.module('public')
.controller('RegistrationInfoController', RegistrationInfoController);

RegistrationInfoController.$inject = ['user', 'MenuService'];
function RegistrationInfoController(user, MenuService) {
  var $ctrl = this;
  $ctrl.user = user;

  // if ($ctrl.user.favourite) {
  //   MenuService.getMenuItem($ctrl.user.favourite)
  //   .then(function (response) {
  //     $ctrl.item = response;
  //   });
  //
  // }
}

})();
