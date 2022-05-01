import mongoose from "mongoose";
const { Schema } = mongoose;
const opts = {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
};
//To include virtuals in res.json(), you need to set the toJSON schema
// option to { virtuals: true }.
const fundSchema = new Schema({
    title: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "A fund must have a name"],
        maxlength: [40, "A fund name must have less or equal then 40 characters"],
        minlength: [10, "A fund name must have more or equal then 10 characters"],
    },
    category: {
        type: String,
        required: [true, "Category has to be specified"],
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        required: [true, "Description of the fund is required"],
    },
    projectedAmount: {
        type: Number,
        required: [true, "Amount projected from a fund is required"],
    },
    receivedAmount: {
        type: Number,
    },
    ip: {
        type: String,
        required: true,
    },
    imageCover: {
        type: String,
        // required: [true, 'A tour must have a image cover']
    },
    lastDate: {
        type: String,
        required: [true, "Please provide the deadline of the fund"],
    },
    proofs: [{ type: String }],
    numOfPeople: {
        type: Number,
    },
    donors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
}, { timestamps: true }, opts);
fundSchema.virtual('transactions', {
    ref: 'Transaction',
    localField: '_id',
    foreignField: 'fundId',
});
//Remaining Amount - Based on Transaction
//Average Amount Donated - Based on Transaction
//Amount Collected - Based on Transaction
//Highest Donation
//Lowest Donation
//Array of dates and amony collected on that day left
export default mongoose.model("Fund", fundSchema);