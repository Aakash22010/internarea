// models/LoginHistory.js
const mongoose = require('mongoose');

const loginHistorySchema = new mongoose.Schema({
  email: String,
  browser: String,
  os: String,
  deviceType: String,
  ipAddress: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LoginHistory', loginHistorySchema);
