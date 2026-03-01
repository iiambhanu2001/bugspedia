import mongoose, { Schema } from "mongoose";

const bugsschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
    },
    createdByname: {
      type: String,
    },
    solution: [
      {

        text: {
          type: String,
        },
        createdAt: { type: Date, default: Date.now() },
        createdBy: {
          type: String,
        },
        createdByname: {
          type: String,
        }
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Bug", bugsschema);
