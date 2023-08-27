const express = require('express');
const router = express.Router();
const Item = require("../Database/Schemas/Item");

router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/add', async (req, res) => {
    const priceValue = parseFloat(req.body.price);
    if (isNaN(priceValue)) {
        return res.status(400).json({ message: "Invalid price format." });
    }

    const item = new Item({
        name: req.body.name,
        price: priceValue,
        originalPrice: priceValue
    });

    try {
        const newItem = await item.save();
        res.status(201).json({ success: true, item: newItem });
    } catch (err) {
        console.error("Error saving item:", err);
        res.status(400).json({ message: err.message });
    }
});


router.put('/:id/discount', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Not Found" });

        if (item.discountApplied) {
            return res.status(400).json({ message: "Discount already applied." });
        }

        item.price = req.body.price;  // Set price directly
        item.discountApplied = true; 

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id/removeDiscount', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Not Found" });

        if (!item.discountApplied) {
            return res.status(400).json({ message: "Discount not applied to this item." });
        }

        item.price = item.originalPrice;  // Reset price
        item.discountApplied = false;

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;