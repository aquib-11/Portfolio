import Project from "../models/projectModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundErr, UnauthorizedErr } from "../errors/customErors.js";
import cloudinary from "cloudinary";
import { formatImage } from "../middleware/multer.js";
export const getAllProjects = async (req, res) => {
  const {projectType , search} = req.query 

  const QueryObject = {}
  if(search){
    QueryObject.$or = [
      { title: { $regex: search, $options: "i" } },
      { technologyUsed: { $regex: search, $options: "i" } },
    ];
  }
  if (projectType && projectType !== "all") {
      QueryObject.projectType = projectType
  }
  
  //setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 6
  const skip = (page - 1) * limit


  const projects = await Project.find(QueryObject).limit(limit).skip(skip)
  const totalProjects =  await Project.countDocuments(QueryObject)
  const numOfPages = Math.ceil(totalProjects / limit);
  res.status(StatusCodes.OK).json({ totalProjects ,numOfPages,currentPage :page, projects });
};

export const createProject = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");
  
  const newProject = {...req.body}
  if (req.file){
    const file = formatImage(req.file)
    const response = await cloudinary.v2.uploader.upload(file)
    newProject.avatar = response.secure_url
    newProject.avatarPublicId = response.public_id
  }
  req.body.createdBy = req.user.userId;
  const project = await Project.create(newProject);
  res.status(StatusCodes.CREATED).json({ msg:"project created" });
};

export const getSingleProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) throw new NotFoundErr(`no project with id ${id}`);
  res.status(StatusCodes.OK).json({ project  });
};

export const updateProject = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");

  const { id } = req.params;
   const newProject = { ...req.body };
   if (req.file) {
     const file = formatImage(req.file);
     const response = await cloudinary.v2.uploader.upload(file);
     newProject.avatar = response.secure_url;
     newProject.avatarPublicId = response.public_id;
   }
  const UpdatedProject = await Project.findByIdAndUpdate(id, newProject);
  if (!UpdatedProject) throw new NotFoundErr(`no project with id ${id} `);
  if (req.file && UpdatedProject.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(UpdatedProject.avatarPublicId);
  }
    res.status(StatusCodes.OK).json({ msg: "project updated" });
};

export const deleteProject = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");
  const { id } = req.params;
  const project = await Project.findByIdAndDelete(id);
  if (!project) throw new NotFoundErr(`no project with id ${id}`);
  res.status(StatusCodes.OK).json({ msg: "project deleted" });
};
