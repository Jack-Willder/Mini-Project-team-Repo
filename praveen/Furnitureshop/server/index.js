const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const adminRoutes=require("./routes/adminRoutes");
const userRoutes=require("./routes/userRoutes");
const itemRoutes=require("./routes/itemRoutes");
const app=express();
const PORT=5000;

app.use(cors());
app.use(express.json());

const MONGO_URL = "mongodb://127.0.0.1:27017/furnitureshop";
mongoose.connect(MONGO_URL)
.then(() =>console.log("MongoDB connected"))
.catch((err) =>console.error("MongoDB connection error:",err));

app.use("/api/admin",adminRoutes);
app.use("/api/user",userRoutes);
app.use("/api",itemRoutes);

app.listen(PORT,() =>{
  console.log(`Server running on port ${PORT}`);
});
