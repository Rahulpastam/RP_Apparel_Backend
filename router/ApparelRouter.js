import express from "express"

import { sendDonationMessage, sendRecycleMessage, sendDisposeMessage } from "../controllers/ApparelController.js"
import {isUserAuthenticated} from "../middlewares/auth.js"

const router = express.Router()

router.post("/donation", isUserAuthenticated, sendDonationMessage);
router.post("/recycle",isUserAuthenticated, sendRecycleMessage);
router.post("/dispose",isUserAuthenticated, sendDisposeMessage);

export default router;