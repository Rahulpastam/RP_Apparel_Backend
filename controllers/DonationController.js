import  {Donation}  from "../models/DonationSchema.js"
import ErrorHandler from "../middlewares/errorHandler.js"
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"

export const sendDonationMessage = catchAsyncErrors(async (req, res, next) => {
    const { itemName, quantity, catogory } = req.body;
    
    if(!itemName || !quantity || !catogory){
        return next(new ErrorHandler("Please fill all the details of your apperal so that it reaches that the fit one", 400))
    }

    await Donation.create({
        itemName,
        quantity,
        catogory,
    });

    res.status(200).json({
        success: true,
        message: "Your donation has been sent successfully",
    })
  });


