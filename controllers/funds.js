import Fund from "../models/funds";
import multer from "multer";
import sharp from "sharp";

export const createFund = async(req, res) => {
    const {
        title,
        category,
        createdBy,
        description,
        projectedAmount,
        ip,
        lastDate,
    } = req.body;
    const exists = await Fund.findOne({ title });
    if (exists)
        return res.json({
            error: "Title is already taken for another fund",
        });
    const fund = new Fund({
        title,
        category,
        createdBy,
        description,
        projectedAmount,
        ip,
        lastDate,
    });
    try {
        await fund.save();
        return res.json({
            success: "Fund created Successfully",
            fund,
        });
    } catch (e) {
        return res.json({
            error: "Failed",
            message: e.message,
        });
    }
};