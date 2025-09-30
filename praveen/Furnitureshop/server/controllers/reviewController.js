import Review from "../models/review.js";
import User from "../models/user.js";
import Item from "../models/items.js";  
import Order from "../models/order.js";

export const createReview = async (req, res) => {
  try {
    const { items, orderId, userId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No reviews to submit" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const reviewDocs = items.map((item) => ({
      orderId,
      userId,
      productId: item.productId,
      rating: item.rating,
      comment: item.comment,
    }));

    await Review.insertMany(reviewDocs);

    res.status(201).json({ message: "Reviews submitted successfully" });
  } catch (err) {
    console.error("Error saving review:", err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "You already reviewed this product in this order" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("productId", "name category size desc variants") 
      .populate("userId", "name email")
      .populate("orderId", "_id orderDate")
      .sort({ reviewDate: -1 });
    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error("Error deleting review:", err);
    res.status(500).json({ message: "Error deleting review" });
  }
};

export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId })
      .populate("userId", "name email")
      .sort({ reviewDate: -1 });
    res.json(reviews);
  } catch (err) {
    console.error("Error fetching product reviews:", err);
    res.status(500).json({ message: "Error fetching product reviews" });
  }
};