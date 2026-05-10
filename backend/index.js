import express, { json } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import "./middleware/authMiddleware.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";



import projectRoutes from "./routes/projectRoutes.js";
config();

const app = express();

// Middleware
app.use(json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("MERN Task Manager API is running!");
});

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handlers
app.use(notFound);
app.use(errorHandler);

// 🔥 IMPORTANT: Connect DB first, then start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected!");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

startServer();