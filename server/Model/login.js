const mongoose = require('mongoose');

const loginSchema = mongoose.model('User', new mongoose.Schema({
    email: String,
    password: String,
  }));


  module.exports = mongoose.model('login', loginSchema);
