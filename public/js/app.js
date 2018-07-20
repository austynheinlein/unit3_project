const app = angular.module('MyApp', []);


app.controller('MyController', ['$http', function($http){
  const controller = this;
  this.funny = 'haha';
}]);
