import { Router } from "express"
 const router = Router();
 
 import {getAllJobs, getSingleJob, updateJob, createjob,deleteJob} from "../controllers/jobController.js";
import { validateJobInput , validateIdParam } from "../middleware/validationMiddleware.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

//  router.get("/" , getAllJobs);
//  router.post("/", createjob)

router
  .route("/")
  .get(getAllJobs)
  .post(authenticateUser, validateJobInput, createjob);
router
  .route("/:id")
  .get(validateIdParam, getSingleJob)
  .patch(authenticateUser, validateJobInput, validateIdParam, updateJob)
  .delete(authenticateUser, validateIdParam, deleteJob);

export default router