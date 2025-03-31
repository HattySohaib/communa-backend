import { Schema, model } from "mongoose";

const leaderboardSchema = new Schema({
  community: { type: Schema.Types.ObjectId, ref: "Community", required: true },
  performers: [
    [
      { type: Schema.Types.ObjectId, ref: "User", required: true },
      { type: Number, default: 0 },
    ],
  ], // Array of arrays of user IDs and their points
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Leaderboard = model("Leaderboard", leaderboardSchema);
export default Leaderboard;
