import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundErr, UnauthorizedErr } from "../errors/customErors.js";

export const getAllJobs = async (req, res) => {
  console.log(req.user);
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

export const createjob = async (req, res) => {
    if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");
  
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) throw new NotFoundErr(`no job with id ${id}`);
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
    if (req.user.role !== "admin")
      throw new UnauthorizedErr("you are not authorized to access this route");
  const { id } = req.params;
  const job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!job) throw new NotFoundErr(`no job with id${id} `);
  res.status(StatusCodes.OK).json({ msg: "job updated", job });
};

export const deleteJob = async (req, res) => {
    if (req.user.role !== "admin") throw new UnauthorizedErr('you are not authorized to access this route')
  const { id } = req.params;
  const job = await Job.findByIdAndDelete(id);
  if (!job) throw new NotFoundErr(`no job with id ${id}`);
  res.status(StatusCodes.OK).json({ msg: "job deleted", job });
};
