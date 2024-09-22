import mongoose from "mongoose";

const RecycleDisposeSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"],
    },
});

export const Apperal = mongoose.model("RecycleDispose", RecycleDisposeSchema);