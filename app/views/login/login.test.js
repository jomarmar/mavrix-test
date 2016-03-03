'use strict';


describe('mavrixAgenda controllers', function() {


  beforeEach(module('mavrixAgenda'));

  describe('loginCtrl', function(){
    var ctrl, location, _storageSrv, _usersSrv, _countrySrv;

    beforeEach(inject(function($controller, $location, storageSrv, usersSrv) {
       _storageSrv = storageSrv;
       _usersSrv = usersSrv;

       ctrl = $controller('loginCtrl', {$location: location, storageSrv: _storageSrv, usersSrv: _usersSrv});

    }));



    it('check controller is defined', function() {
      expect(ctrl).toBeDefined();
    });

    // More tests to come...

  })
});
