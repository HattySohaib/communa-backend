import { Schema, model } from "mongoose";

const membershipSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: Schema.Types.ObjectId,
    ref: "Community",
    required: true,
  },
  role: {
    type: String,
    enum: ["creator", "admin", "member"],
    required: true,
  },
  joined_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Membership = model("Membership", membershipSchema);
export default Membership;
