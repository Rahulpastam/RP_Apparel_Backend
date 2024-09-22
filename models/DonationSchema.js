import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
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
        required: true,
        enum: ["Men", "Women", "Kids", "Unisex"],
        message: "Please select a valid category",
    },
});

export const Donation = mongoose.model("Donation", DonationSchema);

