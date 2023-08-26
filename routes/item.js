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

router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Not Found" });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const item = new Item({
        serviceName: req.body.serviceName,
        servicePrice: req.body.servicePrice
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Not Found" });

        item.serviceName = req.body.serviceName || item.serviceName;
        item.servicePrice = req.body.servicePrice || item.servicePrice;
        
        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Not Found" });
        
        await item.remove();
        res.json({ message: "Item deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;