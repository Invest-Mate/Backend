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
export const updateUser = updateOne(User);
export const getUser = getOne(User, { path: 'MyFunds User_Transactions', select: 'userId fundId' });
export const getAllUsers = getAll(User);
export const deleteUser = deleteOne(User);
//updating the donor when transaction button is pressed
//To store transaction ID which in turn contains fundId
//Virtual population will be used
//Make a separate route for this population