import mongoose from "mongoose";

const certificationScheme = mongoose.Schema(
  {
    title: String,
    credentialId: String,
    organisation: String,
    desc: String,
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

export default mongoose.model("certification", certificationScheme);
