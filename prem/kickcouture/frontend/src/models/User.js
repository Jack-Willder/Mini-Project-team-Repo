const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
}, {
  collection: 'signup'  // store all users in 'signup' collection
});

module.exports = mongoose.model("User", userSchema);
