import { createOne, getAll, getOne } from "./factory_handler";
import transaction from "../models/transaction";
import catchAsync from "../utils/catchAsync";
import mongoose from "mongoose";
import { data } from "./payment";
//create transaction
//get all transaction
//get transaction
//aggregate pipeline transaction based on fundId

//AGGREGATION PIPELINE = min,max , average fund
//AGGREGATION STATICS = Amount Collected , No of people alias donations

export const createTransaction = catchAsync(async(req, res, next) => {
    const { userId, fundId, ip } = req.body;
    var store = {};
    // TXN_AMOUNT: '8768',
    store.amountFunded = parseInt(data.params.TXN_AMOUNT);
    store.trans_id = data.result.TXNID;
    store.userId = userId;
    store.fundId = fundId;
    store.ip = ip;
    store.status = data.result.STATUS;
    store.trans_date = data.result.TXNDATE;
    store.trans_name = data.params.CUST_ID;
    store.trans_phn = data.params.MOBILE_NO;
    const doc = await transaction.create(store);
    res.status(201).json({
        status: "success",
        data: {
            data: doc,
        },
    });
});
export const getAllTransaction = getAll(transaction);
export const getTransaction = getOne(transaction);
export const getFundTransactions = catchAsync(async(req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {
        fundId: req.params.id
    };
    // if (req.params.tourId) filter = { tour: req.params.tourId };

    // const features = new APIFeatures(Model.find(filter), req.query)
    //     .filter()
    //     .sort()
    //     .limitFields()
    //     .paginate();
    // const doc = await features.query.explain();
    const doc = await transaction.find(filter);

    // SEND RESPONSE
    res.status(200).json({
        status: "success",
        results: doc.length,
        data: {
            data: doc,
        },
    });
});
//Send the fundID and get all its transactions
// export const getFundAnalytics

export const FundStats = catchAsync(async(req, res, next) => {
    const stats = await transaction.aggregate([{
            $match: { "fundId": mongoose.Types.ObjectId(req.params.id) }
        },
        {
            $group: {
                _id: '$fundId',
                noOfDonations: { $sum: 1 },
                TotalamountDonated: { $sum: '$amountFunded' },
                avgDonations: { $avg: '$amountFunded' },
                minDonation: { $min: '$amountFunded' },
                maxDonation: { $max: '$amountFunded' }
            }
        },
    ]);
    console.log(stats);
    res.status(200).json({
        status: 'success',
        stats
    });
});