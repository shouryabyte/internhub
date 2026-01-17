import mongoose, { Schema } from "mongoose";

const ApplicationSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    internship: {
      type: Schema.Types.ObjectId,
      ref: "Internship",
      required: true,
    },
    status: {
      type: String,
      enum: ["APPLIED", "APPROVED", "REJECTED"],
      default: "APPLIED",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", ApplicationSchema);
