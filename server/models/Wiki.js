const mongoose = require('mongoose');

const WikiSchema = new mongoose.Schema({
  title: String,
  content: String,
});

module.exports = mongoose.model('Wiki', WikiSchema);
