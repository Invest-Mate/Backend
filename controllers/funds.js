import Fund from "../models/funds";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./factory_handler";

export const createFund = createOne(Fund);
// catchAsync(async(req, res) => {
//     const {
//         title,
//         category,
//         createdBy,
//         description,
//         projectedAmount,
//         ip,
//         lastDate,
//     } = req.body;
//     const exists = await Fund.findOne({ title });
//     if (exists)
//         return res.json({
//             error: "Title is already taken for another fund",
//         });
//     const fund = new Fund({
//         title,
//         category,
//         createdBy,
//         description,
//         projectedAmount,
//         ip,
//         lastDate,
//     });

//     await fund.save();
//     return res.json({
//         success: "Fund created Successfully",
//         fund,
//     });
// });
export const updateFund = updateOne(Fund);
// catchAsync(async(req, res) => {
//     // console.log("profile update req.body", req.body);
//     // console.log(req.files);
//     const data = {};
//     var proofsArray = [];
//     console.log(req.files);
//     // data.imageCover = req.files.imageCover.originalname;
//     req.files.proofs.map((proof) => proofsArray.push(proof.originalname));
//     data.proofs = proofsArray;
//     // console.log(req.body.proofs);
//     if (req.files.imageCover)
//         data.imageCover = req.files.imageCover[0].originalname;
//     if (req.body.title) {
//         data.title = req.body.title;
//     }
//     if (req.body.description) {
//         data.description = req.body.description;
//     }
//     if (req.body.category) {
//         data.category = req.body.category;
//     }
//     if (req.body.projectedAmount) {
//         data.projectedAmount = req.body.projectedAmount;
//     }
//     if (req.body.lastDate) {
//         data.lastDate = req.body.lastDate;
//     }

//     let fund = await Fund.findByIdAndUpdate(req.body._id, data, { new: true });
//     if (!fund) {
//         return next(new AppError('No fund found with that ID', 404));
//     }
//     //In data variable the variable you are using should be same as that of model
//     // console.log('udpated user', user)
//     res.json({ fund });
// });
export const deleteFund = deleteOne(Fund);
export const getAllFunds = getAll(Fund);
export const getFund = getOne(Fund);
export const topFunds = catchAsync(async(req, res, next) => {
    const stats = await Fund.aggregate([
        // {
        //   $match: { ratingsAverage: { $gte: 4.5 } }
        // },
        // {
        //   $group: {
        //     _id: { $toUpper: '$difficulty' },
        //     numTours: { $sum: 1 },
        //     numRatings: { $sum: '$ratingsQuantity' },
        //     avgRating: { $avg: '$ratingsAverage' },
        //     avgPrice: { $avg: '$price' },
        //     minPrice: { $min: '$price' },
        //     maxPrice: { $max: '$price' }
        //   }
        // },
        {
            $sort: { numOfPeople: -1 }
        },
        {
            $limit: 5
        }
        // {
        //   $match: { _id: { $ne: 'EASY' } }
        // }
    ]);
    res.status(200).json({
        status: 'success',
        data: {
            stats
        }
    });
});