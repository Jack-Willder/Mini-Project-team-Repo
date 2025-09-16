// models/user.js
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  doorNo: { type: String, required: true, trim: true },
  street: { type: String, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, trim: true },
  postalCode: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  landmark: { type: String, trim: true },
  type: { type: String, enum: ["Home", "Work", "Other"], default: "Home" }
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: addressSchema, // ✅ embedded object schema
      required: true,
    },
  },
  { collection: "user", timestamps: true }
);

// ✅ ES Modules export
const User = mongoose.model("User", userSchema);
export default User;
