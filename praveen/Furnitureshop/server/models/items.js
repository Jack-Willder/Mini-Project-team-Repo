const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true  // ensures no duplicate productId values
  },
  name: String,
  category: String,
  size: String,
  desc: String,
  variants: [
    {
      woodType: String,
      price: Number,
      stock: Number,
    }
  ],
  image: {
    data: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model('Item', itemSchema);
