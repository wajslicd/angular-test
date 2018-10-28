(function() {
  'use strict';

  angular.module('public')
  .controller('RegistrationController', RegistrationController);

  RegistrationController.$inject = ['MenuService', 'RegistrationService']
  function RegistrationController(MenuService, RegistrationService) {
    var $ctrl = this;
    // var user = {};

    $ctrl.savedMessage = "Your information has been saved";
    $ctrl.completed = false;

    $ctrl.user = {
      firstname: "",
      lastname: "",
      email: "",
      phone:"",
      favourite: ""
    };

    // user.firstname = "";
    // user.lastname = "";
    // user.email = "";
    // user.phone = "";
    // user.favourite = "";

    $ctrl.submit = function () {
      RegistrationService.addUser($ctrl.user);
      $ctrl.completed = true;
    };

    $ctrl.verifyFavourite = function (favourite) {
        return MenuService.getMenuItem(favourite)
        .then(function (response) {
          $ctrl.menuError = false;
          $ctrl.user.item = response;
        })
        .catch(function (error) {
          $ctrl.menuError = true;
        });
    };

  }
})();
