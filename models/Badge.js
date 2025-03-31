import { Schema, model } from "mongoose";

const badgeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, enum: ["streak", "points"], required: true },
  required: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Badge = model("Badge", badgeSchema);
export default Badge;
