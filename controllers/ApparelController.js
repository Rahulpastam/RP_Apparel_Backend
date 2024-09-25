import { Apparel } from "../models/ApparelSchema.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

export const sendDonationMessage = catchAsyncErrors(async (req, res, next) => {
  const { itemName, quantity, catogory, pickupDate } = req.body;

  if (!itemName || !quantity || !catogory || !pickupDate) {
    return next(new ErrorHandler("Please fill all the details", 400));
  }
  const user = await req.user;

  const Donation = await Apparel.create({
    userId: user._id,
    label: "Donation",
    itemName,
    quantity,
    catogory,
    pickupDate,
  });

  res.status(200).json({
    success: true,
    message: "Your Request for donation has been sent successfully",
    Donation,
  });
});

export const sendRecycleMessage = catchAsyncErrors(async (req, res, next) => {
  const { itemName, quantity, pickupDate, catogory } = req.body;

  if (!itemName || !quantity || !pickupDate || !catogory) {
    return next(new ErrorHandler("Please fill all the details", 400));
  }
  const userId = req.user._id;
  const Recycle = await Apparel.create({
    userId,
    label: "Recycle",
    itemName,
    quantity,
    catogory,
    pickupDate,
  });
  res.status(200).json({
    success: true,
    message: "Your Request for Recycle has been sent successfully",
    Recycle,
  });
});

export const sendDisposeMessage = catchAsyncErrors(async (req, res, next) => {
  const { itemName, quantity, pickupDate, catogory } = req.body;

  if (!itemName || !quantity || !pickupDate || !catogory) {
    return next(new ErrorHandler("Please fill all the details", 400));
  }
  const userId = req.user._id;
  const Dispose = await Apparel.create({
    userId,
    label: "Dispose",
    itemName,
    catogory,
    quantity,
    pickupDate,
  });
  res.status(200).json({
    success: true,
    message: "Your request for Dispose has been sent successfully",
    Dispose,
  });
});
