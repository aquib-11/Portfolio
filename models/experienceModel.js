import mongoose from "mongoose";
const experienceScheme = mongoose.Schema(
  {
    post: String,
    company: String,
    location: String,
    address: String,
    desc: String,
    startDate:String,
    endDate:String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("experience", experienceScheme);
