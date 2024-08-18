import mongoose from "mongoose";

const InboxScheme = mongoose.Schema(
  {
    name: String,
    email: String,
    subject: String,
    message: String,
    isread: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Inbox", InboxScheme);
