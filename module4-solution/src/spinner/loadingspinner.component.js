(function () {
  'use strict';

  angular.module('Spinner')
  .component('loadingSpinner', {
    templateUrl: 'src/spinner/loadingspinner.template.html',
    controller: SpinnerController
  });

  SpinnerController.$inject = ['$rootscope'];
  function SpinnerController($rootscope) {
    var $ctrl = this;
    var cancellers = [];

    $ctrl.$onInit = function() {
      var cancel = $rootscope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams, options) {
        $ctrl.showSpinner = true;
      });
      cancellers.push(cancel);

      cancel = $rootscope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        $ctrl.showSpinner = false;
      });
      cancellers.push(cancel);

      cancel = $rootscope.$on('$stateChaneError',
      function(event, toState, toParams, fromState, fromParams, error) {
        $ctrl.showSpinner = false;
      });
      cancellers.push(cancel);
    };

    $ctrl.$onDestroy = function() {
      cancellers.forEach(function(item) {
        item();
      });
    };
  }

})();
