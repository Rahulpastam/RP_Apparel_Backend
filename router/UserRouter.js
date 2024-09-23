import express from "express"
import { UserRegister, login, logout, updateAddress} from "../controllers/userController.js"
import { isUserAuthenticated } from "../middlewares/auth.js";

const router = express.Router()

router.post("/register", UserRegister);
router.post("/login", login);
router.get("/logout", isUserAuthenticated, logout)
router.put("/updateAddress/:id",isUserAuthenticated,  updateAddress);

export default router;