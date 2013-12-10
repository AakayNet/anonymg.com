'use strict';

angular.module('myApp.controllers', []).
  controller('mainController',function ($scope, $http, $location, $window, socket) {
    $scope.user = {};
    $scope.authenticate = function (provider) {
      $window.location.href = '/auth/' + provider;
    };
    $scope.logout = function () {
      $http.post('/logout').success(function () {
        $window.location.href = $location.path();
      });
    };
    socket.on('disconnect', function () {
      $$window.location.href = $location.path();
    });
    socket.on('self', function (data) {
      $scope.user = data;
    });
  }).
  controller('homeController', function ($scope, $routeParams, $location, socket) {
  });
