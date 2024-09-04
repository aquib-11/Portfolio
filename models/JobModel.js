import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../utils/contants.js";

const jobSchema = mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS), // Object.values(obj) -- ruturns array of values from obect
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "my city",
    },
    createdBy:{
      type:mongoose.Types.ObjectId,
      ref:'User',
    }
  },
  { timestamps: true }
);

export default mongoose.model("job", jobSchema);