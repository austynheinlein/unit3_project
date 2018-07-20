const app = angular.module('MyApp', []);


app.controller('MyController', ['$http', function($http){
  const controller = this;
  this.funny = 'haha';
//CREATE
  this.createProperty = function(){
      $http({
          method:'POST',
          url:'/properties',
          data: {
            image: this.image,
            rent: this.rent,
            sqft: this.sqft,
            address: this.address,
            beds: this.beds,
            baths: this.baths,
            city: this.city,
            state: this.state,
            zip: this.zip
          }
      }).then(function(response){
          controller.getProperties();
      })
  }

//GET
  this.getProperties = function(){
    $http({
      method:'GET',
      url: '/properties'
    }).then(function(response){
      controller.properties = response.data
    })
  }
//DELETE
  this.deleteProperty = function(property){
    console.log('delete clicked');
    $http({
        method:'DELETE',
        url: '/properties/' + property._id
    }).then(
        function(response){
            controller.getProperties();
        },
        function(error){
          console.log(error);
        }
    );
  }

/// Mouse-over logic
  this.chooseOneProperty = function(property){
      this.property = property;
      console.log(this.property._id)
    }

// Update logic
    // this.updateProperty = function(property){
    //   $http({
    //     method: 'PUT',
    //     url: '/properties/' + property._id,
    //     data: {
    //         image: this.image
    //         rent: this.rent,
    //         sqft: this.sqft,
    //         address: this.address,
    //         beds: this.beds,
    //         baths: this.baths,
    //         city: this.city,
    //         state: this.state,
    //         zip: this.zip
    //     }
    //   }).then(function(response){
    //     console.log(response)
    //     controller.getProperties()
    //     console.log('hi')
    //     console.log(response)
    //   })
    // }

  this.getProperties();
}]);
