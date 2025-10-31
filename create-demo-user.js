// Script to create demo admin user in MongoDB
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import userModel from "./models/userModel.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 
  `mongodb+srv://${encodeURIComponent(process.env.DBUSER)}:${encodeURIComponent(process.env.DBPASS)}@kinshuk.tizneb5.mongodb.net/merncafe?retryWrites=true&w=majority&appName=kinshuk`;

async function createDemoUser() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Check if demo user already exists
    const existingUser = await userModel.findOne({ email: "demo@example.com" });
    
    if (existingUser) {
      console.log("⚠️ Demo user already exists!");
      console.log("User details:", {
        email: existingUser.email,
        firstName: existingUser.firstName,
        role: existingUser.role
      });
      
      // Update password to ensure it's correct
      const hashedPassword = await bcrypt.hash("demo123", 10);
      await userModel.findByIdAndUpdate(existingUser._id, { 
        password: hashedPassword,
        role: "admin" // Ensure admin role
      });
      console.log("✅ Updated demo user password and role");
    } else {
      console.log("Creating demo user...");
      
      const hashedPassword = await bcrypt.hash("demo123", 10);
      const demoUser = {
        firstName: "Demo",
        lastName: "Admin",
        email: "demo@example.com",
        password: hashedPassword,
        role: "admin"
      };
      
      const result = await userModel.create(demoUser);
      console.log("✅ Demo user created successfully!");
      console.log("User ID:", result._id);
      console.log("Email:", result.email);
      console.log("Role:", result.role);
    }
    
    console.log("\n📝 Login credentials:");
    console.log("Email: demo@example.com");
    console.log("Password: demo123");
    
    await mongoose.connection.close();
    console.log("\n✅ Database connection closed");
    process.exit(0);
    
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

createDemoUser();
