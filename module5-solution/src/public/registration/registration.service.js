(function () {
"use strict";

angular.module('public')
.service('RegistrationService', RegistrationService);

function RegistrationService () {
  var service = this;

  var registration = {};
  // var registrations = [];

  service.addUser = function (user) {
    registration.firstname = user.firstname;
    registration.lastname = user.lastname;
    registration.email = user.email;
    registration.phone = user.phone;
    registration.favourite = user.favourite;
    registration.item = user.item;
    // registrations.push(user);
  };

  service.getUser = function () {
    return registration;
  };
}

})();
