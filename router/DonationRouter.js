import express from "express"

import { sendDonationMessage } from "../controllers/DonationController.js"

const router = express.Router()

router.post("/donation/send", sendDonationMessage);

export default router;