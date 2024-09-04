import techstack from "../models/techstack.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundErr, UnauthorizedErr } from "../errors/customErors.js";
import cloudinary from "cloudinary";
import { formatImage } from "../middleware/multer.js";

export const getAllStacks = async (req, res) => {
  const { type, search } = req.query;
  const QueryObject = {};
  if (search) {
    QueryObject.$or = [
      { title: { $regex: search, $options: "i" } },
      { language: { $regex: search, $options: "i" } },
    ];
  }
  if (type) {
    QueryObject.type = type;
  } else {
    QueryObject.type = "Skills";
  }
  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  const totalStacks = await techstack.countDocuments(QueryObject);
  const numOfPages = Math.ceil(totalStacks / limit);

  const stacks = await techstack.find(QueryObject).limit(limit).skip(skip);
  const types = await techstack.distinct("type");
  res
    .status(StatusCodes.OK)
    .json({ stacks, types, totalStacks, numOfPages, currentPage: page });
};

export const createStack = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");

  const newStack = { ...req.body };
  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    newStack.avatar = response.secure_url;
    newStack.avatarPublicId = response.public_id;
  }
  req.body.createdBy = req.user.userId;
  const stack = await techstack.create(newStack);
  res.status(StatusCodes.CREATED).json({ msg: "stack created" });
};

export const getSingleStack = async (req, res) => {
  const { id } = req.params;
  const stack = await techstack.findById(id);
  if (!stack) throw new NotFoundErr(`no stack with id ${id}`);
  res.status(StatusCodes.OK).json({ stack });
};

export const updateStack = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");

  const { id } = req.params;
  const newStack = { ...req.body };
  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    newStack.avatar = response.secure_url;
    newStack.avatarPublicId = response.public_id;
  }
  const UpdatedStack = await techstack.findByIdAndUpdate(id, newStack);
  if (!UpdatedStack) throw new NotFoundErr(`no stack with id ${id} `);
  if (req.file && UpdatedStack.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(UpdatedStack.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "stack updated" });
};

export const deleteStack = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");
  const { id } = req.params;
  const stack = await techstack.findByIdAndDelete(id);
  if (!stack) throw new NotFoundErr(`no stack with id ${id}`);
  res.status(StatusCodes.OK).json({ msg: "stack deleted" });
};
