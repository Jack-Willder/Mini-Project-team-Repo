import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  email: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Customers", customerSchema);
