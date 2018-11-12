(function () {
  'use strict';

  angular.module('public')
  .component('userInfo', {
    templateUrl: 'src/public/user-info/user-info.html',
    bindings: {
      user: '<'
    }

  })
})();
