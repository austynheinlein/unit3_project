const mongoose = require('mongoose')
const Schema = mongoose.Schema

const propertiesSchema = new Schema({
  rent: Number,
  sqft: Number,
  address: String,
  beds: Number,
  baths: Number,
  city: String,
  state: String,
  zip: Number
},
{
  timestamps: true
})

const Property = mongoose.model('Property', propertiesSchema)

module.exports = Property
