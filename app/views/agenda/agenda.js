(function () {
    'use strict';


    function agendaController($scope, $location, storageSrv, usersSrv, countrySrv, filterFilter) {
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
      vm.pagination.numPerPage = 5;


      vm.editable = "";

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
        }
      })();

      // Deletes the agenda. That is, deletes the username key from localstorage.
      vm.deleteAgenda = function() {
        storageSrv.deleteKey(vm.username);
        vm.contacts = [];

        $location.path("/");
      }

      // Show the add contact form
      vm.showAddContact = function () {
        vm.contact.name ="";
        vm.contact.lastname ="";
        vm.contact.email="";
        vm.contact.country = {};
        vm.addcontactshown = true;
        vm.editable = "";
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
        vm.contact.name ="";
        vm.contact.lastname ="";
        vm.contact.email="";
        vm.contact.country = {};

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
        if(vm.filterList) {

          for(var i = vm.filterList.length - 1; i >= 0; i--) {
              if(vm.filterList[i].email === data) {
                vm.filterList.splice(i, 1);
              }
          }
        }

        storageSrv.push(vm.username, JSON.stringify(vm.contacts));
      }


      // Edit a contact
      vm.editContact = function (data) {
        for(var i = vm.filterList.length - 1; i >= 0; i--) {
            if(vm.filterList[i].email === data) {
              vm.contact.name = vm.filterList[i].name;
              vm.contact.lastname = vm.filterList[i].lastname ;
              vm.contact.email = vm.filterList[i].email;
              vm.contact.country = vm.filterList[i].country;
            }
        }

        vm.addcontactshown = false;
        vm.editable = data;

        //

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

        storageSrv.push(vm.username, JSON.stringify(vm.contacts));

        vm.editable = "";
      }

      // Cancel contact edition
      vm.editCancel = function(data) {
        vm.editable = "";
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

      // watch for changes on search
      $scope.$watch('vm.search.$', function (term) {
        // Filter by any field
        vm.filterList = filterFilter(vm.contacts, term);
        vm.pagination.currentPage = 1;
      });

    }


    // Directive for Agenda forms
    var AgendaForm =  function() {
      return {
        restrict: 'E',
        templateUrl: 'views/agenda/agenda-form.html'
      };

    };



    // Directive for confirmations
    var ConfirmClick = function() {
      return {
          link: function (scope, element, attr) {
              var msg = attr.confirmClick || "Are you sure?";
              var clickAction = attr.confirmedClick;
              element.bind('click',function (event) {
                  if ( window.confirm(msg) ) {
                      scope.$apply(clickAction)
                  }
              });
          }
      };
    }

    var Start = function() {
      return function (input, start) {
        if (!input || !input.length) { return; }

        start = +start;
        return input.slice(start);
      };
    }



    var app = angular.module('mavrixAgenda');
    app.controller('agendaCtrl', agendaController);
    app.directive('agendaForm', AgendaForm);
    app.directive('confirmClick', ConfirmClick);
    app.filter('start', Start);



})();
