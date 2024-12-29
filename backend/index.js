import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import fs from "fs";

const imagesDir = path.join(path.resolve(), "images");  

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true }); 
}

const app = express();

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database is connected successfully!");
  } catch (err) {
    console.error(err);
  }
};

// Middleware configuration
dotenv.config();
app.use(express.json());
app.use("/images", express.static(imagesDir)); 
app.use(cors({ origin: process.env.FRONTEND, credentials: true }));
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// Image upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir); 
  },
  filename: (req, file, cb) => {
    cb(null, req.body.img); 
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image has been uploaded successfully!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
