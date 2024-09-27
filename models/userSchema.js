import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Enter valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Enter a valid Mobile number"],
    maxLength: [10, "Enter a valid Mobile number"],
  },
  houseNo: {
    type: String,
    require: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
    minLength: [6, "Enter a valid Pincode"],
    maxLength: [6, "Enter a valid Pincode"],
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [6, "Password should atleast be 6 in length"],
  },
  confirmPassword: {
    type: String,
    select: false,
    minlength: [6, "Password should atleast be 6 in length"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  // console.log(process.env.JWT_EXPIRES);
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);
