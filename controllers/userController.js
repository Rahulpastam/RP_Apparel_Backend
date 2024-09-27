import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "./jwtTokens.js";

export const UserRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
    houseNo,
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
    !houseNo ||
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
    houseNo,
    street,
    city,
    pincode,
    password,
  });

  generateToken(user, "Registered Succesfully.", 200, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(req.body);
  if (!email || !password) {
    return next(new ErrorHandler("Please fill all the details", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  generateToken(user, `Welcome Back ${user.firstName}`, 200, res);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("userToken", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
      sameSite: "None",
      secure: true,
    })
    .json({
      success: true,
      message: "loggedout Successfully",
    });
});

export const updateAddress = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }
  const { firstName, lastName, email, phone, password, ...allowedFields } =
    req.body;
  user = await User.findByIdAndUpdate(id, allowedFields, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Address Updated Successfully",
    user,
  });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});
