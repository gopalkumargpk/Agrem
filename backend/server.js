const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const marketplaceRoutes = require("./routes/marketplaceRoutes");
const dataRoute = require("./routes/dataRoutes");

dotenv.config();

const app = express();

// ✅ CORS Setup — only allow Vercel frontend (no trailing slash!)
app.use(
  cors({
    origin: "https://agrem.vercel.app", // Make sure there's NO trailing slash
    credentials: true, // Only if using cookies/auth
  })
);

app.use(express.json());

// Connect to MongoDB
const connectDB = require("./config/db");
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Routes
app.use("/api/marketplaces", marketplaceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
