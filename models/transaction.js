import mongoose from "mongoose";
import Fund from "./funds";
const { Schema } = mongoose;
const opts = { toJSON: { virtuals: true } };
//To include virtuals in res.json(), you need to set the toJSON schema
// option to { virtuals: true }.
const transSchema = new Schema({
        amountFunded: {
            type: Number,
            required: true,
        },
        trans_name: {
            type: String,
        },
        trans_phn: {
            type: String,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        trans_id: {
            type: String,
            required: true,
        },
        trans_date: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        credited_To: {
            type: String,
            default: "378282246310005",
        },
        fundId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Fund",
        },
        ip: {
            type: String,
            required: true,
        },
    }, { timestamps: true },
    opts
);
transSchema.statics.calcAmountFunded = async function(fundId) {
    const stats = await this.aggregate([{
            $match: { fundId: fundId },
        },
        {
            $group: {
                _id: "$fundId",
                TotalamountDonated: { $sum: "$amountFunded" },
                noOfDonations: { $sum: 1 },
            },
        },
    ]);
    console.log(stats);
    console.log(stats[0].noOfDonations);
    if (stats.length > 0) {
        await Fund.findByIdAndUpdate(fundId, {
            receivedAmount: stats[0].TotalamountDonated,
            numOfPeople: stats[0].noOfDonations,
        });
    } else {
        await Fund.findByIdAndUpdate(fundId, {
            receivedAmount: stats[0].TotalamountDonated,
            numOfPeople: stats[0].noOfDonations,
        });
    }
};
transSchema.post("save", function() {
    // this points to current review
    this.constructor.calcAmountFunded(this.fundId);
});

export default mongoose.model("Transaction", transSchema);