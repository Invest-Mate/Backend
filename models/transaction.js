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
        trans_date: {
            type: Date.now().format("DD-MM-YYYY"),
        },
        status: {
            type: Boolean,
            required: true,
        },
        debited_From: {
            acc_no: {
                type: String,
                required: true,
            },
            holder_name: {
                type: String,
                required: true,
            },
            ifsc: {
                type: String,
                required: true,
            },
        },
        credited_To: {
            type: String,
            required: true,
        },

        fundId: {
            type: ObjectId,
            required: true,
        },
        ip: {
            type: String,
            required: true,
        },
    }, { timestamps: true },
    opts
);

export default mongoose.model("Transaction", transSchema);