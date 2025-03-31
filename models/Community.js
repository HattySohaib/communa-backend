import { Schema, model } from "mongoose";

const communitySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Community = model("Community", communitySchema);
export default Community;
