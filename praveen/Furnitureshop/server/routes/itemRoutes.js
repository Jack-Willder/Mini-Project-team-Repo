import express from "express";
import multer from "multer";
import { createItem, getItems, getImage, updateItem, deleteItem } from "../controllers/itemController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), createItem);
router.get("/", getItems);
router.get("/image/:id", getImage);
router.put("/:id", upload.single("image"), updateItem);
router.delete("/:id", deleteItem);

export default router;
