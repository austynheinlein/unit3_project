const app = angular.module('MyApp', []);


app.controller('MyController', ['$http', function($http){
  const controller = this;
  this.modal = false;

  this.toggleModal = function(){
    this.modal = !this.modal
    console.log(this.modal)
  }

  this.createModal = false;

  this.toggleCreateModal = function(){
    this.createModal = !this.createModal
    console.log(this.createModal)
  }

//GET USER
  this.getUser = function(){
    console.log('function working');
    $http({
      method: 'GET',
      url: '/users'
    }).then(function(response){
      console.log(response);
      controller.users = response.data
    })
  }

//CREATE USER
  this.createUser = function(){
    console.log('function working');
    $http({
      method: 'POST',
      url: '/users',
      data: {
        username: this.username,
        password: this.password
      }
    }).then(function(response){
      console.log(response);
      controller.getUser()
    })
  }


//Create Session (Log-in)

this.logIn = function(){
      $http({
          method:'POST',
          url:'/sessions',
          data: {
              username:this.username,
              password:this.password
          }
        }).then(function(response){
          controller.user = response.config.data.username
            console.log(response);
        })
    }


/// Delete session

this.logOut = function(){
  console.log('delete clicked');
  $http({
      method:'DELETE',
      url: '/sessions'
  }).then(
      function(response){
        console.log(response)
      },
      function(error){
        console.log(error);
      }
  );
}

//CREATE PROPERTIES
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
          controller.toggleCreateModal();
          // console.log('hi')
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
    console.log('hello')
      this.property = property;
      console.log(this.property.image)
    }

      /// Update Property
this.updateProperty = function(property){
$http({
        method: 'PUT',
        url: '/properties/' + property._id,
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
        console.log(response)
        controller.getProperties()
        console.log('hi')
        console.log(response)
        controller.toggleModal();
      })
    }

    this.show = false;

    this.toggleShow = function(property){
      this.show = !this.show
    }
  this.getProperties();
}]);
