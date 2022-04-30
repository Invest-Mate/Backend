import mongoose from "mongoose";
const { Schema } = mongoose;
const opts = { toJSON: { virtuals: true } };
//To include virtuals in res.json(), you need to set the toJSON schema
// option to { virtuals: true }.
const transSchema = new Schema({
        amountFunded: {
            type: Number,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        trans_date: {
            type: String,
        },
        status: {
            type: Boolean,
            required: true,
        },
        credited_To: {
            type: String,
            default: '378282246310005',
        },
        fundId: {
            type: ObjectId,
            required: true,
            ref: 'Fund'
        },
        ip: {
            type: String,
            required: true,
        },
    }, { timestamps: true },
    opts
);

export default mongoose.model("Transaction", transSchema);