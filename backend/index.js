const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors"); // Add cors middleware

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log("MongoDB Connection Error:", err));

// Routes

const userRoutes = require('./routes/userRoutes.js');
app.use(express.json()); 
app.use('/api/users', userRoutes); // Changed to more standard API prefix
const eventRoutes = require('./routes/eventroutes.js');
app.use('/api/events',eventRoutes);
const speaker = require("./routes/sprak.js");
app.use("/speaker", speaker);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// Server setup
const PORT = process.env.PORT || 5731;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));