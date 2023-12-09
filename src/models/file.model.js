import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: [true, "Please provide a filename"],
    },
    fileType: {
      type: String,
    },
    parentFolder: {
      type: Schema.Types.ObjectId,
      ref: "File",
    },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.models.files || mongoose.model("files", fileSchema);

export default File;
