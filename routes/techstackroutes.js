import { Router } from "express";
const router = Router();

import {
  deleteStack,
  updateStack,
  getSingleStack,
  createStack,
  getAllStacks,
} from "../controllers/techstackController.js";


import {
  validateTechstackInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";


import { authenticateUser } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

//  router.get("/" , getAllJobs);
//  router.post("/", createjob);

router
  .route("/")
  .get(getAllStacks)

  .post(
    authenticateUser,
    upload.single("avatar"),
    validateTechstackInput,
    createStack);
    
router
  .route("/:id")
  .get(validateIdParam, getSingleStack)

  .patch(
    authenticateUser,
    upload.single("avatar"),
    validateTechstackInput,
    validateIdParam,
    updateStack)

  .delete(authenticateUser,validateIdParam, deleteStack);

export default router;
