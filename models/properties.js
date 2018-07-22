const mongoose = require('mongoose')
const Schema = mongoose.Schema

const propertiesSchema = new Schema({
  image: String,
  rent: Number,
  sqft: Number,
  address: String,
  beds: Number,
  baths: Number,
  city: String,
  state: String,
  zip: Number,
  description: String
},
{
  timestamps: true
})

const usersSchema = new Schema({
  username: String,
  password: String,
  properties: [propertiesSchema]
})

const Property = mongoose.model('Property', propertiesSchema)
const User = mongoose.model('User', usersSchema)

module.exports.User = User
module.exports.Property = Property
