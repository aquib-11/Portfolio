import { Router } from "express";
const router = Router();

import {
  getAllProjects,
  getSingleProject,
  updateProject,
  createProject,
  deleteProject,
} from "../controllers/projectController.js";

import {
  validateProjectInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

import { authenticateUser } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

//  router.get("/" , getAllJobs);
//  router.post("/", createjob);

router
  .route("/")
  .get(getAllProjects)
  .post(authenticateUser, upload.single("avatar"), validateProjectInput,createProject);
router
  .route("/:id")
  .get(validateIdParam, getSingleProject)
  .patch(authenticateUser,upload.single("avatar"), validateProjectInput, validateIdParam, updateProject)
  .delete(authenticateUser, validateIdParam, deleteProject);

export default router;
