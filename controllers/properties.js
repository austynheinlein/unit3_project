const express = require('express')
const router = express.Router()
const {Property} = require('../models/properties.js')

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

//NAV ROUTES
//by city
router.get('/washingtondc',(req,res)=>{
    Property.find({city: {$in: ['Washington']}},null, {sort: {name: 1}}, (err, showProp)=>{
      res.json(showProp);
    });
});
//by state
router.get('/florida',(req,res)=>{
    Property.find({state: {$in: ['Florida']}},null, {sort: {name: 1}}, (err, showProp)=>{
      res.json(showProp);
    });
});
module.exports = router
