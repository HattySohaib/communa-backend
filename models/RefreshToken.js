import { Schema, model } from "mongoose";

const refreshTokenSchema = new Schema({
  token: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now },
});

const RefreshToken = model("RefreshToken", refreshTokenSchema);
export default RefreshToken;
