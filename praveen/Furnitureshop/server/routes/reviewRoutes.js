import express from "express";
import {
  createReview,
  getAllReviews,
  deleteReview,
  getReviewsByProduct,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", createReview);

router.get("/", getAllReviews);

router.delete("/:id", deleteReview);

router.get("/product/:productId", getReviewsByProduct);

export default router;
