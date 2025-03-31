import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { putObject, getObject } from "../services/s3Service.js";

// Register new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const file = req.file;

  const hashedPassword = await bcrypt.hash(password, 10);

  let imageFilename = null;
  if (file) {
    const bucketName = process.env.BUCKET_NAME;
    await putObject(bucketName, file);
    imageFilename = file.originalname;
  }

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    image: imageFilename,
  });

  if (imageFilename) {
    const bucketName = process.env.BUCKET_NAME;
    user.image = await getObject(bucketName, imageFilename);
  }

  res.status(201).json({ message: "User registered successfully", user });
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );
    res.json({ accessToken, refreshToken });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

// Logout user
export const logoutUser = (req, res) => {
  res.json({ message: "User logged out successfully" });
};

// Get current user profile
export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.image) {
    const bucketName = process.env.BUCKET_NAME;
    user.image = await getObject(bucketName, user.image);
  }

  res.json(user);
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  });
  res.json(user);
};

// Get user profile by ID
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};
