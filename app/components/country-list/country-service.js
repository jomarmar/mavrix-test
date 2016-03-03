(function() {
  'use strict'

  /*
    countryService. Factory to access to country data.
  */
  var countryService = function($resource) {
    return $resource('components/country-list/:dataId.json', {}, {
        query: {method:'GET', params:{dataId:'data'}, isArray:true}
      });
  }


  var data = angular.module('mavrixAgenda');
  data.factory('countrySrv', countryService);

})();
