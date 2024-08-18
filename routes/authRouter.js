import { Router } from "express";
const router = Router();


import { login, logout, register, verifyEmail } from "../controllers/authController.js";
import { validateLoginInput, validateRegisterInput } from "../middleware/validationMiddleware.js";
import { getAdminData, getUserRole, updateAdminData } from "../controllers/userController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

router.post("/register",validateRegisterInput, register);
router.post("/verify-email", verifyEmail);
router.post("/login",validateLoginInput, login);
router.get("/logout",  logout);
router.get("/userRole",getUserRole )
router.get("/admin-data", getAdminData);
router.patch(
  "/update-user-details/:id",
  authenticateUser,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "avatar1", maxCount: 1 },
  ]),
  updateAdminData
);


export default router