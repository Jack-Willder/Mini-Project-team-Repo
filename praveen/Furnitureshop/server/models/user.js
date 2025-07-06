const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

//  This forces mongoose to use 'Admin' collection name exactly (not 'admins')
const user = mongoose.model("user", userSchema, "user");

module.exports = user;
