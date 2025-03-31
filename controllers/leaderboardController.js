import Leaderboard from "../models/Leaderboard.js";
import Badge from "../models/Badge.js";
import { getObject } from "../services/s3Service.js";

// Get global leaderboard
export const getGlobalLeaderboard = async (req, res) => {
  const leaderboard = await Leaderboard.find().sort({ points: -1 });
  res.json(leaderboard);
};

// Get community leaderboard
export const getCommunityLeaderboard = async (req, res) => {
  const leaderboard = await Leaderboard.find({
    community: req.params.communityId,
  }).sort({ points: -1 });
  res.json(leaderboard);
};

// Get user's badges
export const getUserBadges = async (req, res) => {
  const badges = await Badge.find({ user: req.params.id });

  const bucketName = process.env.BUCKET_NAME;
  for (const badge of badges) {
    badge.image = await getObject(bucketName, badge.image);
  }

  res.json(badges);
};
