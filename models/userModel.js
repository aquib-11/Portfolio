import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verified: Date,
  avatar: String,
  avatarPublicId: String,
  avatar1: String,
  avatar1PublicId: String,
  email:String,
  phone: String,
  birthday: String,
  location: String,
  whatappUrl: String,
  LinkedUrl: String,
  GithubUrl: String,
  headline:String,
  aboutMe:String,
  whatIdid:String,
  whatIdo:String,
  extraPoints:String,
});

export default mongoose.model("user", userSchema)