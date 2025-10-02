import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  doorNo: { type: String, required: true, trim: true },
  street: { type: String,required: true, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String,required: true, trim: true },
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
      type: addressSchema, 
      required: true,
    },
  },
  { collection: "user", timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
