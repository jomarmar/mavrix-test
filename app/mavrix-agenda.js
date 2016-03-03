(function () {
    'use strict';

    var jfApp = angular.module('mavrixAgenda', ['ngRoute', 'ngResource', 'ngStorage', 'ngSanitize', 'ngMessages', 'ui.select', 'ui.bootstrap']);

    jfApp.config( ['$routeProvider', '$locationProvider',
      function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'loginCtrl',
                templateUrl: 'views/login/login.html',
                controllerAs: 'vm'
            })

            .when('/agenda', {
                controller: 'agendaCtrl',
                templateUrl: 'views/agenda/agenda.html',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/' });
    }]);
 })();
