(function () {
  'use strict';

  /*
    LoginController.
  */
  function loginController( $location, storageSrv, usersSrv) {
    var vm = this;

    vm.userlist = [];
    vm.view = "DIVS_VIEW";


    // Fills userlist with users (prefix: _mvxag_ ) found in local storage
    (function initController() {
      vm.allStorage = storageSrv.getAllStorageKeys();
      for(var user in vm.allStorage) {
        vm.userlist.push(user);
      }

    })();

    // Upon selected item this method is called. Here set the current user and
    // redirect to /agenda
    vm.onSelectCallback = function (item, model) {
      if(  $.inArray(item, vm.userlist) < 0 ) {
        storageSrv.push(item, "");
      }

      usersSrv.setCurrentUser(item);
      if(vm.view === "DIVS_VIEW") {
        $location.path("/agenda");
      } else {
        $location.path("/agenda-table");
      }
    };

  }


  var app = angular.module('mavrixAgenda');
  app.controller('loginCtrl', loginController);


})();
