(function () {

  /*
  storegeService. This service handles local storage for Mavrix agenda.
  */
  function storageService ($localStorage) {

    var storageService = this;
    var storage = $localStorage;


    storageService.getAllStorageKeys = function() {

      var archive = {},
      keys = Object.keys(storage),
      i = 0, key;

      if(keys.length && keys.length > 0) {
          for (; key = keys[i]; i++) {
            if(key.startsWith("_mvxag_")) {
              archive[key.substring(7)] = storage[key];
            }
          }
          return archive;
      } else {
          return {}
      }
    }

    storageService.push = function (key, data) {
      storage["_mvxag_"+key] = data;
    }

    storageService.pull = function (key) {
      return storage["_mvxag_"+key];
    }

    storageService.deleteKey = function (key) {
      delete storage["_mvxag_"+key];
    }

    storageService.deleteAll = function () {
      storage.$reset();
    }
  }


  var app = angular.module('mavrixAgenda');
  app.service('storageSrv', storageService);

})();
