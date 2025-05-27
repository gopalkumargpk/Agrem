const mongoose = require("mongoose");


const DataModel = mongoose.model("marketplaceselections", new mongoose.Schema({}, { strict: false }));

exports.fetchData = async (req, res) => {
  try {
    const data = await DataModel.find().limit(20); // optional: .sort({ createdAt: -1 })
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
