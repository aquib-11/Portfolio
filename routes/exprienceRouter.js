import { Router } from "express";
const router = Router();

import {
  getAllExprience,
  getSingleExprience,
  updateExprience,
  createExprience,
  deleteExprience,
} from "../controllers/experienceController.js";

import {
  validateExprienceInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

import { authenticateUser } from "../middleware/authMiddleware.js";
//  router.get("/" , getAllJobs);
//  router.post("/", createjob);

router
  .route("/")
  .get(getAllExprience)

  .post(authenticateUser, validateExprienceInput, createExprience);
router
  .route("/:id")
  .get(validateIdParam, getSingleExprience)

  .patch(
    authenticateUser,
    validateExprienceInput,
    validateIdParam,
    updateExprience
  )

  .delete(authenticateUser, validateIdParam, deleteExprience);

export default router;
