// controllers/itemController.js
import Item from '../models/items.js';  // ES module import

export const createItem = async (req, res) => {
  try {
    console.log("Received body:", req.body);
    console.log("Received file:", req.file);

    const { productId, name, category, size, desc, variants } = req.body;

    let parsedVariants = [];
    try {
      parsedVariants = JSON.parse(variants);
    } catch (err) {
      return res.status(400).json({ error: "Invalid variants format", details: err.message });
    }

    if (!productId || !name || !category || !desc || !size || parsedVariants.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const image = req.file ? {
      data: req.file.buffer,
      contentType: req.file.mimetype
    } : null;

    const newItem = new Item({
      productId,
      name,
      category,
      size,
      desc,
      variants: parsedVariants,
      image
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error("Error in createItem:", err.message);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

export const getItems = async (req, res) => {
  try {
    const items = await Item.find({}, '-image');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getImage = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item || !item.image || !item.image.data) {
      return res.status(404).send('Image not found');
    }
    res.contentType(item.image.contentType);
    res.send(item.image.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { productId, name, category, size, desc, variants } = req.body;

    let parsedVariants = [];
    try {
      parsedVariants = JSON.parse(variants);
    } catch (err) {
      return res.status(400).json({ error: "Invalid variants format", details: err.message });
    }

    const updateData = {
      productId,
      name,
      category,
      size,
      desc,
      variants: parsedVariants
    };

    if (req.file) {
      updateData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    const updated = await Item.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("Error in updateItem:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
