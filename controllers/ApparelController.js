import  {Apparel}  from "../models/ApparelSchema.js"
import ErrorHandler from "../middlewares/errorHandler.js"
import  catchAsyncErrors  from "../middlewares/catchAsyncErrors.js"

export const sendDonationMessage = catchAsyncErrors(async (req, res, next) => {
    const { itemName, quantity, catogory, pickupDate } = req.body;
    
    if(!itemName || !quantity || !catogory || !pickupDate ){
        return next(new ErrorHandler("Please fill all the details of your apperal so that it reaches that the fit one", 400))
    }
    const user = await req.user;

    const Donation = await Apparel.create({
        userId: user._id,
        label: "Donation",
        itemName,
        quantity,
        catogory,
        pickupDate
    });

    res.status(200).json({
        success: true,
        message: "Your Request for donation has been sent successfully",
        Donation,
        street,
        houseNo,
        ciyt,
        pincode
    })
  });

  export const sendRecycleMessage = catchAsyncErrors(async (req, res, next) => {
    const {itemName, quantity, pickupDate} = req.body;
    
    if(!itemName || !quantity || !pickupDate){
        return next(new ErrorHandler("Please fill all the details of your apperal For Recycle request", 400))
    }
    const userId = req.user._id;
    const Recycle = await Apparel.create({
        userId,
        label: "Recycle",
        itemName,
        quantity,
        pickupDate
    });
    res.status(200).json({
        success: true,
        message: "Your Request for Recycle has been sent successfully",
        Recycle,
    })
  });

  export const sendDisposeMessage = catchAsyncErrors(async (req, res, next) => {
    const { itemName, quantity, pickupDate} = req.body;
    
    if(!itemName || !quantity || !pickupDate){
        return next(new ErrorHandler("Please fill all the details of your apperal for Dispose request", 400))
    }
    const userId = req.user._id;
    const Dispose = await Apparel.create({
        userId,
        label: "Dispose",
        itemName,
        quantity,
        pickupDate
    });
    res.status(200).json({
        success: true,
        message: "Your request for Dispose has been sent successfully",
        Dispose,
    })
  });

