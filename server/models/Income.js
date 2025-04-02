import mongoose from "mongoose";
// This is the schema for the Income model

const IncomeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    icon: {
        type: String
    },
    source: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
},
{
    timestamps: true,
});

export const Income = mongoose.model('Income', IncomeSchema);