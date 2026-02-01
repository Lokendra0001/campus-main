const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  dateLost: String,
  timeLost: String,
  location: String,
  reward: String,
  value: String,
  photos: [String],
}, { timestamps: true });

module.exports = mongoose.model('LostItem', lostItemSchema);
