import Community from "../models/Community.js";
import Membership from "../models/Memberships.js";
import { putObject, getObject } from "../services/s3Service.js";

// Create a new community
export const createCommunity = async (req, res) => {
  const { name, description } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ message: "Image is required" });

  const bucketName = process.env.BUCKET_NAME;
  await putObject(bucketName, file);

  const community = await Community.create({
    name,
    description,
    image: file.originalname,
  });

  const imageUrl = await getObject(bucketName, file.originalname);
  community.image = imageUrl;

  res.status(201).json(community);
};

// Get all communities
export const getAllCommunities = async (req, res) => {
  const communities = await Community.find();

  const bucketName = process.env.BUCKET_NAME;
  for (const community of communities) {
    community.image = await getObject(bucketName, community.image);
  }

  res.json(communities);
};

// Get community details by ID
export const getCommunityById = async (req, res) => {
  const community = await Community.findById(req.params.id);

  if (!community)
    return res.status(404).json({ message: "Community not found" });

  const bucketName = process.env.BUCKET_NAME;
  community.image = await getObject(bucketName, community.image);

  res.json(community);
};

// Join a community
export const joinCommunity = async (req, res) => {
  const membership = await Membership.create({
    user: req.user.id,
    community: req.params.id,
    role: "member",
  });
  res.status(201).json(membership);
};

// Leave a community
export const leaveCommunity = async (req, res) => {
  await Membership.findOneAndDelete({
    user: req.user.id,
    community: req.params.id,
  });
  res.json({ message: "Left community successfully" });
};

// Delete a community (admin only)
export const deleteCommunity = async (req, res) => {
  await Community.findByIdAndDelete(req.params.id);
  res.json({ message: "Community deleted successfully" });
};
