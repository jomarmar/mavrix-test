'use strict';

describe('service', function() {

  var countKeys = function(data) {
      var count = 0
      for(var k in data) {
          count++;
      }
      return count;
  }

  // load modules
  beforeEach(module('mavrixAgenda'));

  // Test service availability
  it('check the existence of Storage factory', inject(function(usersSrv) {
      expect(usersSrv).toBeDefined();

  }));

  // Test users
  it('testing set/get users', inject(function(usersSrv){
      usersSrv.setCurrentUser("test-user");

      var user = usersSrv.getCurrentUser();

      expect(user).toBe("test-user");
  }));

});
