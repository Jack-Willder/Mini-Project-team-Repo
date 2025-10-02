const mongoose =require ("mongoose");

const customerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true }
}, { timestamps: true });


const Customer = mongoose.model("Customer", customerSchema, "Customer");
module.exports = Customer;
