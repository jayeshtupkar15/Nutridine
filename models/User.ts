import mongoose from "mongoose";

// Define the User schema
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],   // Allowed values
      default: "user",           // Default role
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

// Prevent model overwrite during hot reloads
export default mongoose.models.User || mongoose.model("User", UserSchema);
