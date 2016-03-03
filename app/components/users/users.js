(function () {

  /*
  userService. Basic service to set/get the current agenda's owner
  */
  function usersService () {

    var usersService = this;
    usersService.currentUser ="";


    usersService.getCurrentUser = function() {
      return usersService.currentUser;
    }

    usersService.setCurrentUser = function (user) {
      usersService.currentUser = user;
    }

  }

  var app = angular.module('mavrixAgenda');
  app.service('usersSrv', usersService);

})();
