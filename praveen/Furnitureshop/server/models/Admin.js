import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
}, { collection: "Admin" });

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;
