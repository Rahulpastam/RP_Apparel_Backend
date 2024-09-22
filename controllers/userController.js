import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import { User } from "../models/userSchema.js";
import cloudinary from "cloudinary";
import { generateToken } from "./jwtTokens.js";

export const UserRegister = catchAsyncErrors(async (req, res, next) => {

  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
    street,
    city,
    pincode,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !confirmPassword ||
    !street ||
    !city ||
    !pincode
  ) {
    return next(new ErrorHandler("Please fill all the details", 400));
  }

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("Email already exists", 400));
  }


  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    street,
    city,
    pincode,
    password,
    confirmPassword,
  });

  generateToken(user, "User Registered Succesfully.", 200, res);
});
