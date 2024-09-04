import { Router } from "express";
const router = Router();

import {
  getAllCertification,
  getSingleCertification,
  updateCertification,
  createCertification,
  deleteCertification,
} from "../controllers/certificationController.js";

import {
  validateCertificationInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

import { authenticateUser } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";


router
  .route("/")
  .get(getAllCertification)

  .post(
    authenticateUser,
    upload.single("avatar"),
    validateCertificationInput,
    createCertification
  );
router
  .route("/:id")
  .get(validateIdParam, getSingleCertification)

  .patch(
    authenticateUser,
    upload.single("avatar"),
    validateCertificationInput,
    validateIdParam,
    updateCertification
  )
  .delete(authenticateUser, validateIdParam, deleteCertification);

export default router;
