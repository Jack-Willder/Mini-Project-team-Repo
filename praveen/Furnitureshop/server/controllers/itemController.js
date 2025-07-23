const Item = require('../models/items');

// Create a new item
const createItem = async (req, res) => {
  try {
    console.log("Received body:", req.body);
    console.log("Received file:", req.file);

    const { name, category, size, desc, variants } = req.body;

    // Validate and parse variants
    let parsedVariants = [];
    try {
      parsedVariants = JSON.parse(variants);
    } catch (err) {
      return res.status(400).json({ error: "Invalid variants format", details: err.message });
    }

    if (!name || !category || !desc || !size || parsedVariants.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const image = req.file ? {
      data: req.file.buffer,
      contentType: req.file.mimetype
    } : null;

    const newItem = new Item({
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

// Get all items
const getItems = async (req, res) => {
  try {
    const items = await Item.find({}, '-image'); // exclude binary image
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get image by item ID
const getImage = async (req, res) => {
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

// Update item
const updateItem = async (req, res) => {
  try {
    const { name, category, size, desc, variants } = req.body;

    let parsedVariants = [];
    try {
      parsedVariants = JSON.parse(variants);
    } catch (err) {
      return res.status(400).json({ error: "Invalid variants format", details: err.message });
    }

    const updateData = {
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

// Delete item
const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createItem,
  getItems,
  getImage,
  updateItem,
  deleteItem
};
