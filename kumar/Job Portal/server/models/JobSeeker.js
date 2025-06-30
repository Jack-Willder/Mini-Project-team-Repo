const mongoose = require("mongoose");

const jobseekerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
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
  },
  { collection: "JobSeekers", timestamps: true }
);

module.exports = mongoose.model("JobSeekers", jobseekerSchema);
