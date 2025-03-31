import { Schema, model } from "mongoose";

const taskSubmissionSchema = new Schema({
  task: {
    type: Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
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
  proof: { type: String, required: true },
  status: { type: String, enum: ["approved", "rejected"], required: true },
  points_awarded: { type: Number, default: 0 },
  reviewed_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviewed_at: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const TaskSubmission = model("TaskSubmission", taskSubmissionSchema);
export default TaskSubmission;
