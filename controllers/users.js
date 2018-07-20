const express = require('express')
const router = express.Router()
const {User} = require('../models/properties.js')
const bcryptjs = require('bcryptjs')


//get
router.get('/', (req, res) => {
  User.find({}, (err, foundUser) => {
    res.json(foundUser)
  })
})

//create
router.post('/', (req, res)=>{
  req.body.password = bcryptjs.hashSync(req.body.password,
  bcryptjs.genSaltSync(10));
  User.create(req.body, (err, createdUser)=>{
    res.status(201).json({
      status:201,
      message:"user created"
    })
  });
});



/// Delete user
// delete
router.delete('/:id', (req, res)=>{
  User.findByIdAndRemove(req.params.id, (err, deletedUser)=>{
    res.json(deletedUser)
  })
})


module.exports = router
