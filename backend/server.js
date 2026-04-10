const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load env variables
dotenv.config();

// DB connection
const connectDB = require("./config/db");

// Initialize app
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://school-management-system-git-main-adity322s-projects.vercel.app"
  ],
  credentials: true
}));
// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Root route (health check)
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler (optional but professional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

// Port setup
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});