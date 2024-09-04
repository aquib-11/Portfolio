import mongoose from "mongoose";
import { PROJECT_TYPE } from "../utils/contants.js";
const projectScheme = mongoose.Schema(
  {
    title: String,
    desc: String,
    technologyUsed: String,
    address: String,
    projectType: {
      type: String,
      enum: Object.values(PROJECT_TYPE),
      default: PROJECT_TYPE.FRONT_END,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    avatar:String,
    avatarPublicId:String,
  },
  { timestamps: true }
);

export default mongoose.model("project", projectScheme);