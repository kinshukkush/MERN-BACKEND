import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Route imports
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";
import UserModel from "./models/userModel.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares - Updated CORS for Vercel deployment
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

// MongoDB Connection with caching for Vercel serverless
let isConnected = false;

async function connectToDatabase() {
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log("✅ Using cached MongoDB connection");
    return;
  }
  
  const MONGODB_URI = process.env.MONGODB_URI || 
    `mongodb+srv://${encodeURIComponent(process.env.DBUSER)}:${encodeURIComponent(process.env.DBPASS)}@kinshuk.tizneb5.mongodb.net/merncafe?retryWrites=true&w=majority&appName=kinshuk`;

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    isConnected = true;
    console.log("✅ MongoDB connected successfully!");
    console.log(`📊 Database: ${mongoose.connection.name}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    isConnected = false;
    throw err;
  }
}

// Middleware to ensure database connection before each request
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error("Connection middleware error:", error);
    res.status(503).json({ 
      message: "Database connection error", 
      error: error.message 
    });
  }
});

// API Routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({ 
    message: "🍵 MERN Cafe API is running!",
    status: "active",
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Optional: List first 5 users for testing
app.get("/check-users", async (req, res) => {
  try {
    await connectToDatabase();
    const users = await UserModel.find().limit(5).select('-password');
    res.json({ count: users.length, users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: "Something went wrong!",
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Export the Express app for Vercel
export default app;

// Only start the server if not in Vercel serverless environment
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
  });
}
