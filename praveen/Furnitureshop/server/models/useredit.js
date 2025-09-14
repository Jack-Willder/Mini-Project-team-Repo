import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  doornumber: { type: String, default: "" },
  street: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  postalcode: { type: String, default: "" },
  country: { type: String, default: "" },
  landmark: { type: String, default: "" },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: addressSchema, default: {} },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
