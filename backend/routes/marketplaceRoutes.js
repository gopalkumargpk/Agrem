const express = require("express");
const router = express.Router();
const MarketplaceSelection = require("../models/MarketplaceSelection");

// POST - Save selected marketplaces
router.post("/", async (req, res) => {
  try {
    const { marketplaces } = req.body;
    const newSelection = new MarketplaceSelection({ marketplaces });
    await newSelection.save();
    res.status(201).json({ message: "Saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Optional: Get all saved selections
router.get("/", async (req, res) => {
  try {
    const all = await MarketplaceSelection.find().sort({ selectedAt: -1 });
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
