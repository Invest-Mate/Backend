import User from "../models/user";
import catchAsync from "../utils/catchAsync";
import sharp from "sharp";
// const multer = require("multer");

import moment from "moment";

// export const uploadUserPhoto = (req, res, next) => {
//     upload.single("photo");
//     next();
// };

export const createUser = catchAsync(async(req, res, next) => {
    const { name, dob, address, email, aadhar, contact, ip, userId } = req.body;
    const exist = await User.findOne({ email });
    if (exist)
        return res.json({
            error: "Email is already taken",
        });

    const user = new User({
        name,
        dob,
        address,
        email,
        aadhar,
        contact,
        ip,
        userId,
    });

    await user.save();
    return res.json({
        success: "Successfully registered",
        data: { user },
    });
});

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
    return res.json({
        success: `Successfully updated ${req.body.id}`,
        data: { user },
    });
});
export const updateUser = catchAsync(async(req, res, next) => {
    // console.log("profile update req.body", req.body);
    const data = {};
    data.photo = req.file.filename;

    if (req.body.name) {
        data.name = req.body.name;
    }
    if (req.body.dob) {
        data.dob = req.body.dob;
    }
    if (req.body.address) {
        data.address = req.body.address;
    }
    if (req.body.aadhar) {
        data.aadhar = req.body.aadhar;
    }
    if (req.body.contact) {
        data.contact = req.body.contact;
    }

    let user = await User.findByIdAndUpdate(req.body.id, data, { new: true });
    //In data variable the variable you are using should be same as that of model
    // console.log('udpated user', user)
    res.json({ user, data });
});

export const getUser = catchAsync(async(req, res, next) => {
    // const { id } = req.body;

    let data = await User.find();
    return res.json({
        success: "Successfull",
        data,
    });
});

export const deleteUser = catchAsync(async(req, res, next) => {
    let data = await User.findByIdAndDelete(req.body.id);
    return res.json({
        success: "Successfully Deleted the user",
        data,
    });
});