const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  bio: String,
  imageurl: String,

});


module.exports = mongoose.model('Speaker', userSchema);
