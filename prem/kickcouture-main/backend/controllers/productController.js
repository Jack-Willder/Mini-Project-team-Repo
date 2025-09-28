const ProductModel = require("../models/Product");
const path = require("path");
const jwt = require("jsonwebtoken");

const SECRET = "productSecretKey";

exports.addProduct = async (req, res) => {
  
  // console.log("Body:", req.body);
  // console.log("File:", req.file);
  
  const { name, category, size, brand, gender, price, desc } = req.body;
  const imagePath = req.file ? req.file.path : null;
  // console.log("path", imagePath)
  
  try {
    const newProduct = new ProductModel({
      name,
      category,
      size,
      brand,
      gender,
      price,
      description: desc,
      image: imagePath
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", data: newProduct });
  } catch (error) {
    // console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({ message: "Products fetched successfully", data: products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await ProductModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};