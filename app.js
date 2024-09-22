import express from "express"
import { config } from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbconnection.js";
import DonationRouter from "./router/DonationRouter.js"
import ErrorHandler from "./middlewares/errorHandler.js";


const app = express();
config({ path: "./config.env"})

//middlewares
app.use(cors({
origin: [process.env.FRONTEND_URL],
methods: ["GET", "POST", "PUT", "DELETE"],
credentials: true,
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}))

app.use("/api/message", DonationRouter);



dbConnection()

app.use(ErrorHandler)
export default app;