const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

//  This forces mongoose to use 'Admin' collection name exactly (not 'admins')
const Admin = mongoose.model("Admin", adminSchema, "Admin");

module.exports = Admin;
