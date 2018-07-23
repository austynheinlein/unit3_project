const app = angular.module('MyApp', []);


app.controller('MyController', ['$http', function($http){
  const controller = this;
  this.modal = false;
  this.loggedIn = false;
  this.noShow = true;


  this.toggleModal = function(){
    this.modal = !this.modal
    console.log(this.modal)
    this.noModal = !this.noModal
  }

  this.createModal = false;

  this.toggleCreateModal = function(){
    this.createModal = !this.createModal
    this.noModal = !this.noModal
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
        password: this.password,
        properties: []
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
          controller.loggedIn = !controller.loggedIn
          controller.currentUserProperties = response.data.user.properties
          controller.user = response.config.data.username
          console.log('------------------------')
          console.log(controller.currentUserProperties)
          console.log('------------------------')
          console.log('------------------------')
          console.log(controller.currentUserProperties)
          console.log('------------------------')
            console.log(response);
        }, function(error){
          alert('no such username in system')
          console.log(error);
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
        controller.loggedIn = !controller.loggedIn
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
          document.getElementById("createProperty").reset()
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

// Push one property into the user
    this.likeProperty = function(property){
      $http({
        method: 'put',
        url: '/properties/' + property._id + '/like',
        data: {
          property: property
        }
      }).then(function(response){
        console.log(response)
      }, function(error){
        console.log(error)
      })
    }


    // Update logic
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
    // Click for show page

    this.chooseOneShowProperty = function(property){
        this.property = property;
       console.log(this.property.image)
      }

    this.show = false;

    this.toggleShow = function(property){
      this.noShow = !this.noShow
      this.show = !this.show
    }

    // NAV STUFF

    this.getSearchedProperties = function(search){

      console.log('GET SEARCH');
      console.log(search);
      $http({
        method:'GET',
        url: '/properties/' + search
      }).then(function(response){
        controller.properties = response.data

      })
    }
// ================================CURRENT WORKING SECTION -ANDI
  this.currentLocation = '';
  this.search ='';
  this.wasClicked = false;

  this.toggleClicked = function(wasClicked){
    console.log('hello')
      this.wasClicked = !this.wasClicked;
      console.log(this.wasClicked)
    }

  this.getRent = function(search){

    console.log('get rent', this.wasClicked);
    $http({
      method:'GET',
      //url: '/properties/'+ search
      url: '/properties/'+ this.currentLocation + '/'+ search
    }).then(function(response){
      controller.properties = response.data

      console.log(response.data);
    })
  }

  this.chooseSearchParam = function(currentLocation){
    console.log('Current Location')
      this.currentLocation = currentLocation;
      console.log(currentLocation)

    }

  this.noModal = true;

  this.getProperties();
}]);
