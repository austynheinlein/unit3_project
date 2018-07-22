const express = require('express')
const router = express.Router()
const {Property} = require('../models/properties.js')
const {User} = require('../models/properties.js')

//get
router.get('/', (req, res) => {
  Property.find({}, (err, foundProperty) => {
    res.json(foundProperty)
  })
})

//create
router.post('/', (req, res) => {
  Property.create(req.body, (err, createdProperty) => {
    res.json(createdProperty)
  })
})


// Seed Route

/// Seed Route

const seed = require('../models/seedproperties.js');

router.get('/seed', (req, res) => {
  // encrypts the given seed passwords
  Property.create(seed, (err, createdProperties) => {
    console.log(createdProperties);
    res.json(createdProperties)
  });
});

// delete
router.delete('/:id', (req, res)=>{
  Property.findByIdAndRemove(req.params.id, (err, deletedProperty)=>{
    res.json(deletedProperty)
  })
})


// update
router.put('/:id', (req, res)=>{
  Property.findByIdAndUpdate(req.params.id, req.body, {return: true}, (err, updatedProperty)=>{
    res.json(updatedProperty)
  })

})

//<<<<<<< HEAD
//NAV ROUTES
//by city
router.get('/stpetersburg',(req,res)=>{
    Property.find({city: {$in: ['St. Petersburg']}},null, {sort: {name: 1}}, (err, showProp)=>{
      res.json(showProp);
    });
});
router.get('/seattle',(req,res)=>{
    Property.find({city: {$in: ['Seattle']}},null, {sort: {name: 1}}, (err, showProp)=>{
      res.json(showProp);
    });
});

router.get('/portland',(req,res)=>{
    Property.find({city: {$in: ['Portland']}},null, {sort: {name: 1}}, (err, showProp)=>{
      res.json(showProp);
    });
});
//by state
router.get('/florida',(req,res)=>{
    Property.find({state: {$in: ['Florida']}},null, {sort: {name: 1}}, (err, showProp)=>{
      res.json(showProp);
    });
});
router.get('/maine',(req,res)=>{
    Property.find({state: {$in: ['Maine']}},null, {sort: {name: 1}}, (err, showProp)=>{
      res.json(showProp);
    });
});
router.get('/washington',(req,res)=>{
    Property.find({state: {$in: ['Washington']}},null, {sort: {name: 1}}, (err, showProp)=>{
      res.json(showProp);
    });
});

//=======
router.put('/:id/like', (req, res)=>{
  Property.findById(req.params.id, (err, foundProperty)=>{
    console.log(foundProperty)
    let property = foundProperty;
    User.findByIdAndUpdate( req.session.currentUser._id, {$push: {properties: property}}, (err, updatedUser)=>{
      res.json(updatedUser)
      console.log(updatedUser)
  })
  });
});


//>>>>>>> 2e4bfeddea7d8dbdde3ae647725ea99a47d93011
module.exports = router
