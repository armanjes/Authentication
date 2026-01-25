import mongoose from "mongoose";

export default async function connectDB(uri) {
  try {
    await mongoose.connect(uri);
    console.log("✅ database connected...");
  } catch (error) {
    console.log("❌ DB connection failed: ", error.message);
    process.exit(1);
  }
}
