import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "RP_Apperal_Application"
    }).then(()=>{
        console.log("Connected to MongoDB")
    }).catch((err) => {
        console.log(`Error while connecting to database ${err}`);
    })
}