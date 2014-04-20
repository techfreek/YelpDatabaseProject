'use strict';


// Declare app level module which depends on filters, and services
angular.module('bahmApp', [
  'ngRoute',
  'bahmApp.filters',
  'bahmApp.services',
  'bahmApp.controllers',
  'restangular'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html'});
  $routeProvider.when('/q1', {templateUrl: 'partials/query1.html', controller: 'query1Ctrl'});
  $routeProvider.when('/q2', {templateUrl: 'partials/query2.html', controller: 'query2Ctrl'});
  $routeProvider.when('/q3', {templateUrl: 'partials/query3.html', controller: 'query3Ctrl'});
  $routeProvider.when('/q4', {templateUrl: 'partials/query4.html', controller: 'query4Ctrl'});
  $routeProvider.when('/q5', {templateUrl: 'partials/query5.html', controller: 'query5Ctrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);