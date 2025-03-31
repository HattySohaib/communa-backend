import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { connectDb } from "./config/db.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => res.send("API is running!"));

// Start Server
app.listen(PORT, () => {
  // Connect to Database
  connectDb(process.env.MONGO_URL);
  console.log(`Server is running on http://localhost:${PORT}`);
});
