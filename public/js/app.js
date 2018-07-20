const app = angular.module('MyApp', []);


app.controller('MyController', ['$http', function($http){
  const controller = this;
  this.funny = 'haha';

//GET
  this.getProperties = function(){
    $http({
      method:'GET',
      url: '/properties'
    }).then(function(response){
      controller.properties = response.data
    })
  }



  this.getProperties();
}]);
