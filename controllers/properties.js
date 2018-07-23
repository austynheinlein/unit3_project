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


router.get('/florida',(req,res)=>{
    Property.find({state: {$in: ['Florida']}},null, {sort: {city: 1}}, (err, filteredProp)=>{
      res.json(filteredProp);
    });
});

router.get('/washington',(req,res)=>{
    Property.find({state: {$in: ['Washington']}},null, {sort: {city: 1}}, (err, filteredProp)=>{
      res.json(filteredProp);
    });
});
router.get('/maine',(req,res)=>{
    Property.find({state: {$in: ['Maine']}},null, {sort: {city: 1}}, (err, filteredProp)=>{
      res.json(filteredProp);
    });
});
router.get('/portland',(req,res)=>{
    Property.find({city: {$in: ['Portland']}},null, {sort: {city: 1}}, (err, filteredProp)=>{
      res.json(filteredProp);
    });
});
router.get('/seattle',(req,res)=>{
    Property.find({city: {$in: ['Seattle']}},null, {sort: {city: 1}}, (err, filteredProp)=>{
      res.json(filteredProp);
    });
});
router.get('/stpetersburg',(req,res)=>{
    Property.find({city: {$in: ['St. Petersburg']}},null, {sort: {city: 1}}, (err, filteredProp)=>{
      res.json(filteredProp);
    });
});

// ========================CURRENT WORKING SECTION
// router.get('/:location/low',(req,res)=>{
//   console.log('filtered by low');
//     Property.find({city: req.params},null, {sort: {rent: 1}}, (err, filteredProp)=>{
//       res.json(filteredProp);
//     });
// });
//
// router.get('/:location/high',(req,res)=>{
//   console.log(req.params);
//     Property.find({city: req.params},null, {sort: {rent: -1}}, (err, filteredProp)=>{
//       res.json(filteredProp);
//     });
// });
router.get('/low',(req,res)=>{
  console.log('filtered by low');
    Property.find({},null, {sort: {rent: 1}}, (err, filteredProp)=>{
      res.json(filteredProp);
    });
});

router.get('/high',(req,res)=>{
  console.log(req.params);
    Property.find({},null, {sort: {rent: -1}}, (err, filteredProp)=>{
      res.json(filteredProp);
    });
});

module.exports = router
