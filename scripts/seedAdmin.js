const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const UserSchema = new mongoose.Schema({
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, default: "admin" },
      createdAt: { type: Date, default: Date.now },
    });

    const User = mongoose.models.User || mongoose.model("User", UserSchema);

    const existingAdmin = await User.findOne({ username: "bigfreakyc" });

    if (!existingAdmin) {
      await User.create({
        username: "bigfreakyc",
        password: "bigfreakyc",
        role: "admin",
        createdAt: new Date(),
      });
      console.log("Admin seeded successfully");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.error("Error seeding admin:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

seedAdmin();
