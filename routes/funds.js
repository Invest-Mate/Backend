import express from "express";
import multer from "multer";
import sharp from "sharp";
const AppError = require("./../utils/appError");
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new AppError("Not an image! Please upload only images.", 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

var uploadFundImages = upload.fields([
    { name: "imageCover", maxCount: 1 },
    { name: "proofs", maxCount: 3 },
]);

// upload.single('image') req.file
// upload.array('images', 5) req.files

exports.resizeFundImages = async(req, res, next) => {
    if (!req.files.imageCover || !req.files.proofs) return next();

    // 1) Cover image
    req.body.imageCover = `tour-${req.body._id}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/funds/${req.body.imageCover}`);

    // 2) Images
    req.body.proofs = [];

    await Promise.all(
        req.files.proofs.map(async(file, i) => {
            const filename = `tour-${req.body._id}-${Date.now()}-${i + 1}.jpeg`;

            await sharp(file.buffer)
                .resize(2000, 1333)
                .toFormat("jpeg")
                .jpeg({ quality: 90 })
                .toFile(`public/img/tours/${filename}`);

            req.body.proofs.push(filename);
        })
    );

    next();
};
const router = express.Router();
import {
    createFund,
    deleteFund,
    updateFund,
} from "../controllers/funds";
router.post("/fund/create-fund", createFund);
router.delete("/fund/delete-fund", deleteFund);
router.put("/fund/update-fund", uploadFundImages, updateFund);
module.exports = router;