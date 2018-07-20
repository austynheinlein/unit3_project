const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Property = require('./properties.js')

const usersSchema = new Schema({
  username: String,
  password: String,
  properties: [Property]
})

const User = mongoose.model('User', usersSchema)

module.exports = User
