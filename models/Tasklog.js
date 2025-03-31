import { Schema } from "mongoose";

const tasklogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dates: [
    {
      type: Boolean,
      default: false,
    },
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Tasklog = model("Tasklog", tasklogSchema);
export default Tasklog;
