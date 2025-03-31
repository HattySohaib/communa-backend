import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: {
    type: String,
  },
  password: { type: String, required: true },
  points: { type: Number, default: 0 },
  streakstart: { type: Date, default: Date.now },
  badges: [{ type: Schema.Types.ObjectId, ref: "Badge" }], // Referencing the badges table
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const User = model("User", userSchema);
export default User;
