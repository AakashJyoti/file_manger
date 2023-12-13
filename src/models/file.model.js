import mongoose, { Schema } from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: [true, "Please provide a File Name"],
    },
    isFolder: {
      type: Boolean,
      default: false,
    },
    parentFolder: {
      type: Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.models.files || mongoose.model("files", fileSchema);

export default File;
