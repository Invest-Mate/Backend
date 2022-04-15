import mongoose from "mongoose";
const { Schema } = mongoose;
const opts = { toJSON: { virtuals: true } };
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
        fundId: {
            type: ObjectId,
            required: true,
        },
        createdBy: {
            type: ObjectId,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        projectedAmount: {
            type: Number,
            required: true,
        },
        receivedAmount: {
            type: Number,
            required: true,
        },
        ip: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            default: "",
        },
        lastDate: {
            type: Date.format("DD-MM-YYYY"),
        },
        creationDate: {
            type: Date.now().format("DD-MM-YYYY"),
        },
        proofs: {
            type: Map,
            of: String,
        },
        numOfPeople: {
            type: Number,
        },
    }, { timestamps: true },
    opts
);

export default mongoose.model("Fund", fundSchema);