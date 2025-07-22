const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  stock:Number,
  price:String,
  category:String,
  desc: String,
  image: {
    data: Buffer,
    contentType: String,
  }
});

module.exports = mongoose.model("items", itemSchema);
