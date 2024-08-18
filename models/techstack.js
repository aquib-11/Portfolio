import mongoose from "mongoose";
const techstackScheme = mongoose.Schema(
  {
    type: String,
    title: String,
    language: String,
    address: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    avatar: String,
    avatarPublicId: String,
  },
  { timestamps: true }
);

export default mongoose.model("techstack", techstackScheme);
