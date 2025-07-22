const Item = require("../models/items");

// CREATE Item
exports.createItem = async (req, res) => {
  const { name, desc, stock, price, category } = req.body;

  try {
    const newItem = new Item({
      name,
      desc,
      stock,
      price,
      category,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    await newItem.save();
    res.status(201).json({ message: "Item created", id: newItem._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET All Items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({}, { image: 0 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET Image
exports.getImage = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item || !item.image) return res.status(404).send("Image not found");

    res.set("Content-Type", item.image.contentType);
    res.send(item.image.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ✅ UPDATE Item
exports.updateItem = async (req, res) => {
  const { name, desc, stock, price, category } = req.body;

  try {
    const updatedData = {
      name,
      desc,
      stock,
      price,
      category,
    };

    if (req.file) {
      updatedData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json({ message: "Item updated successfully", item: updatedItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE Item
exports.deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
