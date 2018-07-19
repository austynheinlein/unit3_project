const express = require('express');
const app = express();
const mongoose = require('mongoose')
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rentr_app';
 mongoose.connect(mongoUri);


 const port = process.env.PORT || 3000;
 app.listen(port);
 console.log('---------------------------------');
 console.log('Server running on port: ' + port);
 console.log('---------------------------------');
