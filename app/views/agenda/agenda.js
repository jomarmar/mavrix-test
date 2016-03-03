(function () {
    'use strict';


    function agendaController( $location, storageSrv, usersSrv, countrySrv) {
      var vm = this;
      vm.username = usersSrv.getCurrentUser();
      vm.contacts = [];
      vm.filteredContacts = [];


      vm.contact = {};
      vm.contact.name ="";
      vm.contact.lastname ="";
      vm.contact.email="";
      vm.contact.country = {};

      vm.pagination = {};
      vm.pagination.currentPage = 1;
      vm.pagination.numPerPage = 10;
      vm.pagination.maxSize = 5;

      vm.editable = [];

      vm.addcontactshown = false;

      vm.onError=false;
      vm.errorMessage="";


      // Inits the controller. Retrieves contacts from local storage, retrieves countries list and
      // initiates the pagination.
      (function initController() {
        if(!vm.username) {
          $location.path("/");
        } else {
          var contactData = storageSrv.pull(vm.username);
          if(contactData) {
            vm.contacts = $.parseJSON(storageSrv.pull(vm.username));

          }

          vm.countries = countrySrv.query();

          var begin = ((vm.pagination.currentPage - 1) * vm.pagination.numPerPage);
          var end = begin + vm.pagination.numPerPage;

          vm.filteredContacts = vm.contacts.slice(begin, end);
        }
      })();

      // Deletes the agenda. That is, deletes the username key from localstorage.
      vm.deleteAgenda = function() {
        storageSrv.deleteKey(vm.username);
        vm.contacts = [];
        vm.loadContacts();
      }

      // Show the add contact form
      vm.showAddContact = function () {
        vm.contact.name ="";
        vm.contact.lastname ="";
        vm.contact.email="";
        vm.contact.country = {};
        vm.addcontactshown = true;
        vm.editable = [];
      }

      // Check duplicate entries in contact list. I consider the email to be unique
      // among all contacts
      vm.checkDuplicate = function(email) {
          for(var i = vm.contacts.length - 1; i >= 0; i--) {
              if(vm.contacts[i].email === email) {
                  return true;
              }
          }
          return false;
      }

      // Adds a new contact and stores it. Hide the add contact form
      vm.addContact = function () {
        vm.onError = false;
        var c = {};
        c.name = vm.contact.name;
        c.lastname = vm.contact.lastname;
        c.email = vm.contact.email;
        c.country = vm.contact.country;

        //Check if email already exists in list
        if(vm.checkDuplicate(c.email)) {
          vm.onError = true;
          vm.errorMessage = "Email already exists on contact list";
          return;
        }

        vm.contacts.push(c);

        storageSrv.push(vm.username, JSON.stringify(vm.contacts));
        vm.loadContacts();

        vm.addcontactshown = false;
      };

      // Cancel the add contact. Hide the contact form.
      vm.cancelAddContact = function () {
        vm.addcontactshown = false;
        vm.onError = false;
      };

      // Remove a contact.
      vm.removeContact = function (data) {
        for(var i = vm.contacts.length - 1; i >= 0; i--) {
            if(vm.contacts[i].email === data) {
              vm.contacts.splice(i, 1);
            }
        }
        vm.loadContacts();

        storageSrv.push(vm.username, JSON.stringify(vm.contacts));
      }

      // Check if it is a contact being edited.
      vm.checkIfEditable = function (data) {
        return ($.inArray(data, vm.editable) != -1);
      }

      // Edit a contact
      vm.editContact = function (data) {
        console.log("editContact: " + data);
        for(var i = vm.contacts.length - 1; i >= 0; i--) {
            if(vm.contacts[i].email === data) {
              vm.contact.name = vm.contacts[i].name;
              vm.contact.lastname = vm.contacts[i].lastname ;
              vm.contact.email = vm.contacts[i].email;
              vm.contact.country = vm.contacts[i].country;
            }
        }
        vm.addcontactshown = false;
        vm.editable.push(data);
      }

      // Save the modified contact.
      vm.editSave = function (data) {
        for(var i = vm.contacts.length - 1; i >= 0; i--) {
            if(vm.contacts[i].email === data) {
              vm.contacts[i].name = vm.contact.name;
              vm.contacts[i].lastname = vm.contact.lastname;
              vm.contacts[i].email = vm.contact.email;
              vm.contacts[i].country = vm.contact.country;
            }
        }
        vm.loadContacts();

        storageSrv.push(vm.username, JSON.stringify(vm.contacts));

        vm.editable = $.grep(vm.editable, function(value) {
          return value != data;
        });
      }

      // Cancel contact edition
      vm.editCancel = function(data) {
        vm.editable = $.grep(vm.editable, function(value) {
          return value != data;
        });
      }

      // Reload contact list and set pagination parameters
      vm.loadContacts = function () {
        var begin = ((vm.pagination.currentPage - 1) * vm.pagination.numPerPage);
        var end = begin + vm.pagination.numPerPage;

        vm.filteredContacts = vm.contacts.slice(begin, end);
      }

      // Pagination currenPage
      vm.setPage = function (pageNo) {
          vm.pagination.currentPage = pageNo;
      }

      // Pagination: page has changed
      vm.pageChanged = function() {
          vm.loadContacts()
      }

      // Determines if contact data is valid.
      vm.formValidation = function() {
          var isNotValid = true;
          if(vm.contact.name && vm.contact.lastname && vm.contact.email && vm.contact.country.name) {
              if(vm.contact.email.indexOf('@') > 0) {
                  isNotValid = false;
              } else {

              }
          }
          return isNotValid;
      }

    }


    // Directive for Agenda forms
    var AgendaForm =  function() {
      return {
        restrict: 'E',
        templateUrl: 'views/agenda/agenda-form.html'
      };

    };


    var app = angular.module('mavrixAgenda');
    app.controller('agendaCtrl', agendaController);
    app.directive('agendaForm', AgendaForm);



})();
