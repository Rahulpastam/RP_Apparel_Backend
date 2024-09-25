import express from "express";
import {
  UserRegister,
  login,
  logout,
  updateAddress,
  getUser,
} from "../controllers/userController.js";
import { isUserAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", login);
router.get("/logout", isUserAuthenticated, logout);
router.get("/me", isUserAuthenticated, getUser);
router.put("/updateAddress/:id", isUserAuthenticated, updateAddress);

export default router;
