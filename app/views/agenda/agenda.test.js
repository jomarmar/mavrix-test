'use strict';

describe('mavrixAgenda controllers', function() {


  beforeEach(module('mavrixAgenda'));

  describe('agendaCtrl', function(){
    var ctrl, scope, location, _storageSrv, _usersSrv, _countrySrv, _filterFilter;

    beforeEach(inject(function($controller, $rootScope, $location, storageSrv, usersSrv, countrySrv, filterFilter) {
       scope = $rootScope.$new();;
       location = $location;
       _filterFilter = filterFilter;
       _storageSrv = storageSrv;
       _usersSrv = usersSrv;
       _countrySrv = countrySrv;
       ctrl = $controller('agendaCtrl', {$scope: scope, $location: location, storageSrv: _storageSrv, usersSrv: _usersSrv, countrySrv: _countrySrv, filterFilter: _filterFilter});
       console.log("_storageSrv");

       ctrl.username = "test-user";
       _storageSrv.push("test-user", "");
    }));



    it('check controller is defined', function() {
      expect(ctrl).toBeDefined();
    });

    it('test add contact', function() {
        ctrl.contact.name = "test-contact";
        ctrl.contact.lastname = "test-contact-lastname";
        ctrl.contact.email = "test-contact@tests";
        ctrl.contact.country = "{name: 'Spain', code: 'ES'}";
        ctrl.addContact();

        expect(ctrl.contacts.length).toBe(1);

        var contactData = _storageSrv.pull(ctrl.username);
        if(contactData) {
          var testcontacts = $.parseJSON(_storageSrv.pull(ctrl.username));
          expect(testcontacts.length).toBe(1);
        }
    });

    it('test remove contacts', function () {
        ctrl.removeContact("test-contact@tests");
        expect(ctrl.contacts.length).toBe(0);
    });

    it('test delete agenda', function () {
        ctrl.deleteAgenda();
        expect(ctrl.contacts.length).toBe(0);
        _storageSrv.getAllStorageKeys();
        expect(_storageSrv.pull("test-user")).toBeUndefined();
    })

   })
 });
