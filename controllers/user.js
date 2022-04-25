import User from "../models/user";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import {
    createOne,
    deleteOne,
    getAll,
    getOne,
    updateOne,
} from "./factory_handler";

export const createUser = createOne(User);
export const pushCards = catchAsync(async(req, res, next) => {
    const { ac_name, card_no, expiry, id } = req.body;

    let user = await User.findByIdAndUpdate(
        id, {
            cards: [{
                ac_name: ac_name,
                card_no: card_no,
                expiry: expiry,
            }, ],
        }, { new: true }
    );
    if (!user) {
        return next(new AppError("No user found with that ID", 404));
    }
    return res.json({
        success: `Successfully updated ${req.body.id}`,
        data: { user },
    });
});
export const updateUser = updateOne(User);
export const getUser = getOne(User);
export const getAllUsers = getAll(User);
export const deleteUser = deleteOne(User);