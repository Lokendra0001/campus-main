const mongoose = require('mongoose');

const foundItemSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  dateFound: String,
  timeFound: String,
  location: String,
  condition: String,
  personalInfo: String,
  name: String,
  email: String,
  photos: [String],
}, { timestamps: true });

module.exports = mongoose.model('FoundItem', foundItemSchema);
