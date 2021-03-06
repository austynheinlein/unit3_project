const app = angular.module('MyApp', []);


app.controller('MyController', ['$http', function($http){
  const controller = this;
  this.modal = false;
  this.loggedIn = false;
  this.noShow = true;
  this.loggedOut =true;
  this.noCurrentUserPage = true;
  controller.logInUsername = '';
  controller.logInPassword = '';
  controller.createUsername = '';
  controller.createPassword = '';

  if(this.loggedOut === true){
    this.noCurrentUserPage = true;

  }


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
        username: this.createUsername,
        password: this.createPassword,
        properties: []
      }
    }).then(function(response){
      console.log(response);
      controller.createUsername = '';
      controller.createPassword = '';
    })
  }


//Create Session (Log-in)

this.logIn = function(){
      $http({
          method:'POST',
          url:'/sessions',
          data: {
              username:this.logInUsername,
              password:this.logInPassword
          }
        }).then(function(response){
          controller.loggedOut = !controller.loggedOut
          controller.loggedIn = !controller.loggedIn
          document.getElementById("createUser").reset()
          document.getElementById("loggedInUser").reset()
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
        controller.noCurrentUserPage = true;
        controller.loggedIn = !controller.loggedIn
        console.log(response)
        controller.loggedOut = !controller.loggedOut
        controller.username = 'hi'
        controller.password = 'hi'
        controller.logInUsername = '';
        controller.logInPassword = '';
      },
      function(error){
        console.log(error);
      }
  );
}

//CREATE PROPERTIES
  this.createProperty = function(){
    console.log('creatiiingggg...');
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
            zip: this.zip,
            description: this.descript
          }
      }).then(function(response){
          document.getElementById("createProperty").reset()
          controller.getProperties();
          controller.toggleCreateModal();
          console.log('success!');
          controller.image = '';
          controller.rent = '';
          controller.sqft = '';
          controller.address = '';
          controller.beds = '';
          controller.baths = '';
          controller.city = '';
          controller.state = '';
          controller.zip = '';
          controller.descript  = '';
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
        controller.currentUserProperties.push(response.config.data.property)
      }, function(error){
        console.log(error)
      })
    }

    // Remove one property from the user
        this.dislikeProperty = function(property){
          $http({
            method: 'put',
            url: '/properties/' + property._id + '/dislike',
            data: {
              property: property
            }
          }).then(function(response){
            console.log(response)
            let index = controller.currentUserProperties.indexOf(property)
            controller.currentUserProperties.splice(index, 1)
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
                zip: this.zip,
                description: this.descript
            }
          }).then(function(response){
            console.log(response)
            controller.getProperties()
            console.log('hi')
            console.log(response)
            controller.toggleModal();
            controller.image = '';
            controller.rent = '';
            controller.sqft = '';
            controller.address = '';
            controller.beds = '';
            controller.baths = '';
            controller.city = '';
            controller.state = '';
            controller.zip = '';
            controller.descript  = '';
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
// NAV

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

this.currentLocation = 'all';
this.search ='';
this.wasClicked = false;

this.toggleClicked = function(wasClicked){
    this.wasClicked = !this.wasClicked;
  }

this.getRent = function(search){
  $http({
    method:'GET',
    //url: '/properties/'+ search
    url: '/properties/'+ this.currentLocation + '/'+ search
  }).then(function(response){
    controller.properties = response.data
  })
}

this.currentUserPage = function(){
  this.noCurrentUserPage = !this.noCurrentUserPage
}

this.chooseSearchParam = function(currentLocation){
    this.currentLocation = currentLocation;
  }
  this.noModal = true;

  this.getProperties();
}]);
