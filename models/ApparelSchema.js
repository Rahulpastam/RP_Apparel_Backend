import mongoose from "mongoose";

const ApparelSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        enum: ["Donation", "Recycle", "Dispose"],
        message: "Please select a valid Label",
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
        minLength: [1, "Quantity must be at least 1"],
    },
    catogory: {
        type: String,
        enum: ["Men", "Women", "Kids", "Unisex"],
        message: "Please select a valid category",
    },
    pickupDate: {
        type: Date,
        required: true,
    },
});

export const Apparel = mongoose.model("Apparel", ApparelSchema);

