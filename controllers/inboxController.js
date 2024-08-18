import Inbox from "../models/inboxModel.js"
import { StatusCodes } from "http-status-codes";
import { NotFoundErr, UnauthorizedErr } from "../errors/customErors.js";

export const getAllInbox = async (req, res) => {
  const inboxs = await Inbox.find({});
  res.status(StatusCodes.OK).json({ inboxs });
};

export const createInbox = async (req, res) => {
  const inbox = await Inbox.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "inbox created" });
};

export const updateInbox = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");

  const { id } = req.params;
  req.body.isread = !req.body.isread;
  const Updatedinbox = await Inbox.findByIdAndUpdate(id, req.body);
  if (!Updatedinbox) throw new NotFoundErr(`no inbox with id ${id} `);
  res.status(StatusCodes.OK).json({ msg: "inbox read" });
};


export const deleteInbox = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");
  const { id } = req.params;
  const inbox = await Inbox.findByIdAndDelete(id);
  if (!inbox) throw new NotFoundErr(`no inbox with id ${id}`);
  res.status(StatusCodes.OK).json({ msg: "inbox deleted" });
};
