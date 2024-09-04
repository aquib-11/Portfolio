import Exprience from "../models/experienceModel.js";

import { StatusCodes } from "http-status-codes";
import { NotFoundErr, UnauthorizedErr } from "../errors/customErors.js";

export const getAllExprience = async (req, res) => {
  const exprience = await Exprience.find({});
  res.status(StatusCodes.OK).json({ exprience });
};

export const createExprience = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");

  req.body.createdBy = req.user.userId;
  const exprience = await Exprience.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "exprience created" });
};

export const getSingleExprience = async (req, res) => {
  const { id } = req.params;
  const exprience = await Exprience.findById(id);
  if (!exprience) throw new NotFoundErr(`no experience with id ${id}`);
  res.status(StatusCodes.OK).json({ exprience });
};

export const updateExprience = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");
  const { id } = req.params;
  const exprience = await Exprience.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!exprience) throw new NotFoundErr(`no exprience with id${id} `);
  res.status(StatusCodes.OK).json({ msg: "exprience updated" });
};

export const deleteExprience = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");
  const { id } = req.params;
  const exprience = await Exprience.findByIdAndDelete(id);
  if (!exprience) throw new NotFoundErr(`no exprience with id ${id}`);
  res.status(StatusCodes.OK).json({ msg: "exprience deleted"});
};
