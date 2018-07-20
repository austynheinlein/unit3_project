const express = require('express')
const router = express.Router()
const {User} = require('../models/properties.js')


//get
router.get('/', (req, res) => {
  User.find({}, (err, foundUser) => {
    res.json(foundUser)
  })
})

//create
router.post('/', (req, res) => {
  console.log(req.body);
  User.create(req.body, (err, createdUser) => {
    console.log(err);
    res.json(createdUser)
  })
})


module.exports = router
