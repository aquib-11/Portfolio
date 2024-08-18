import Certification from "../models/Certification.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundErr, UnauthorizedErr } from "../errors/customErors.js";
import cloudinary from "cloudinary";
import { formatImage } from "../middleware/multer.js";


export const getAllCertification = async (req, res) => {
  const certifications = await Certification.find({});
  res.status(StatusCodes.OK).json({ certifications });
};

export const createCertification = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");

  const newcertification = { ...req.body };
  if (req.file) {
    const file = formatImage(req.file);   
    const response = await cloudinary.v2.uploader.upload(file);
    newcertification.avatar = response.secure_url;
    newcertification.avatarPublicId = response.public_id;
  }
  req.body.createdBy = req.user.userId;
  const certification = await Certification.create(newcertification);
  res.status(StatusCodes.CREATED).json({ msg: "certification created" });
};

export const getSingleCertification = async (req, res) => {
  const { id } = req.params;
  const certification = await Certification.findById(id);
  if (!certification) throw new NotFoundErr(`no certification with id ${id}`);
  res.status(StatusCodes.OK).json({ certification });
};

export const updateCertification = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");

  const { id } = req.params;
  const newcertification = { ...req.body };
  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    newcertification.avatar = response.secure_url;
    newcertification.avatarPublicId = response.public_id;
  }
  const UpdatedCertification = await Certification.findByIdAndUpdate(id, newcertification);
  if (!UpdatedCertification) throw new NotFoundErr(`no certification with id ${id} `);
  if (req.file && UpdatedCertification.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(UpdatedCertification.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "certification updated" });
};

export const deleteCertification = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");
  const { id } = req.params;
  const certification = await Certification.findByIdAndDelete(id);
  if (!certification) throw new NotFoundErr(`no certification with id ${id}`);

   if (certification.avatarPublicId) {
     await cloudinary.v2.uploader.destroy(certification.avatarPublicId);
   }

  res.status(StatusCodes.OK).json({ msg: "certification deleted" });
};
