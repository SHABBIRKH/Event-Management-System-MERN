const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log("MongoDB Connection Error:", err));

// Routes
const userRoutes = require('./routes/userRoutes.js');
app.use('/api/users', userRoutes);

const eventRoutes = require('./routes/eventroutes.js');
app.use('/api/events', eventRoutes);

const speaker = require("./routes/sprak.js");
app.use("/api/speaker", speaker); // ⚠️ added /api prefix for consistency

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// ✅ Only listen locally — Vercel handles this in production
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5731;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// ✅ Export for Vercel serverless
module.exports = app;