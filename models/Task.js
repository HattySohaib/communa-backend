import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  diffusion: { type: String, enum: ["easy", "medium", "hard"], required: true },
  deadline: { type: Date, required: true },
  community: {
    type: Schema.Types.ObjectId,
    ref: "Community",
    required: true,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "in_progress", "completed"],
    default: "open",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
