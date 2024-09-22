import express from "express"
import { UserRegister } from "../controllers/userController.js"

const router = express.Router()

router.post("/register", UserRegister);

export default router;