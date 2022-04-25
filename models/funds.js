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
}, { timestamps: true }, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

export default mongoose.model("Fund", fundSchema);