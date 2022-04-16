import User from "../models/user";
import moment from "moment";

export const createUser = async(req, res) => {
    const { name, dob, address, email, aadhar, contact, ip } = req.body;
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
    });
    try {
        await user.save();
        return res.json({
            success: "Successfully registered",
            data: { user }
        });
    } catch (e) {
        return res.json({
            error: e.message,
        });
    }
};