const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const { connectDB, sequelize } = require("./config/db");
const User = require("./models/User");
const Task = require("./models/Task");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("API running...");
});

// Auth Routes
app.use("/api/auth", authRoutes);

// Task Routes
app.use("/api/tasks", taskRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
