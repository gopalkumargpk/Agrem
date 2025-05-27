const mongoose = require("mongoose");

const MarketplaceSelectionSchema = new mongoose.Schema({
  marketplaces: {
    type: [String],      // Array of marketplace names (like ["Amazon", "eBay"])
    required: true,
  },
  selectedAt: {
    type: Date,          // Timestamp of when the selection was made
    default: Date.now,   // Defaults to the current date/time
  },
});

module.exports = mongoose.model("MarketplaceSelection", MarketplaceSelectionSchema);
