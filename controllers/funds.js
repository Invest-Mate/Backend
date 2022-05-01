import Fund from "../models/funds";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import {
    createOne,
    deleteOne,
    getAll,
    getOne,
    updateOne,
} from "./factory_handler";

export const createFund = createOne(Fund);

export const updateFund = updateOne(Fund);
export const deleteFund = deleteOne(Fund);
export const getAllFunds = getAll(Fund);
export const getFund = getOne(Fund);
export const topFunds = catchAsync(async(req, res, next) => {
    const stats = await Fund.aggregate([{
            $sort: { numOfPeople: -1 },
        },
        {
            $limit: 5,
        },
        // {
        //   $match: { _id: { $ne: 'EASY' } }
        // }
    ]);
    res.status(200).json({
        status: "success",
        data: {
            stats,
        },
    });
});
//Average fund received