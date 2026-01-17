import mongoose, { Schema } from "mongoose";

const InternshipSchema = new Schema(
  {
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    jobId: { type: String },
    applyType: {
      type: String,
      enum: ["INTERNAL", "EXTERNAL"],
      default: "INTERNAL",
    },
    applyLink: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Internship", InternshipSchema);
