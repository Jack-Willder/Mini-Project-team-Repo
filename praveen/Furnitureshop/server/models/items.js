import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true
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

const Item = mongoose.model('items', itemSchema);

export default Item; 
