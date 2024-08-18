import { Router } from "express";
const router = Router();

import {
  getAllInbox,
  updateInbox,
  createInbox,
  deleteInbox,
} from "../controllers/inboxController.js";

import {
    validateInboxInput,
    validateIdParam,
} from "../middleware/validationMiddleware.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(authenticateUser, getAllInbox)

  .post(validateInboxInput, createInbox);

router
  .route("/:id")
  .patch(
    authenticateUser,
    validateIdParam,
    updateInbox
  )
  .delete(authenticateUser, validateIdParam, deleteInbox);

export default router;
