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
  it('check the existence of Storage factory', inject(function(storageSrv) {
      expect(storageSrv).toBeDefined();

  }));

  // Test localStorage
  it('testing clear localStorage', inject(function(storageSrv){
      storageSrv.deleteAll();
      var keys = storageSrv.getAllStorageKeys();
      expect(countKeys(keys)).toBe(0);
  }));

  it('testing push/pull/deleteKey to localStorage', inject(function(storageSrv){
      storageSrv.push("test-user", "{'name': 'test', 'lastname': 'test-lastname', 'email': 'test-email@test'}");
      var keys = storageSrv.getAllStorageKeys();
      expect(countKeys(keys)).toBe(1);
      var obj = storageSrv.pull("test-user");
      expect(obj).toBe("{'name': 'test', 'lastname': 'test-lastname', 'email': 'test-email@test'}");

      storageSrv.deleteKey("test-user");
      var keys = storageSrv.getAllStorageKeys();
      expect(countKeys(keys)).toBe(0);

  }));


});
