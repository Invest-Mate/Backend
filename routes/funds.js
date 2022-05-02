import express from "express";
import multer from "multer";
import sharp from "sharp";
import { Filtered } from "../controllers/factory_handler";
const AppError = require("./../utils/appError");
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/img/funds/");
    },
    filename: (req, file, cb) => {
        if (file.fieldname == "imageCover")
            cb(null, `fundCover-${req.body.id}-${file.originalname}`);
        else cb(null, `fundProof-${req.body.id}-${file.originalname}`);
    },
});

// const multerFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith("image")) {
//         cb(null, true);
//     } else {
//         cb(new AppError("Not an image! Please upload only images.", 400), false);
//     }
// };
// const storage = multer.memoryStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads/")
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + "-" + file.originalname)
//     },
//   })
const upload = multer({
    storage: multerStorage,
});

var uploadFundImages = upload.fields([
    { name: "imageCover", maxCount: 1 },
    { name: "proofs", maxCount: 3 },
]);

// upload.single('image') req.file
// upload.array('images', 5) req.files

// var resizeFundImages = async(req, res, next) => {
//     if (!req.files.imageCover || !req.files.proofs) return next();

//     // 1) Cover image
//     req.body.imageCover = `fund-${req.body._id}-${Date.now()}-cover.jpeg`;
//     await sharp(req.files.imageCover[0].buffer)
//         .resize(2000, 1333)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(`public/img/funds/${req.body.imageCover}`);

//     // 2) Images
//     req.body.proofs = [];

//     await req.files.proofs.map(async(file, i) => {
//         var extension = file.mimetype.split('/')[1];
//         var filename;
//         console.log(extension)
//         if (extension === "png") {
//             filename = `fundProof-${req.body._id}-${Date.now()}-${i + 1}.jpeg`;
//             await sharp(file.buffer)
//                 .resize(2000, 1333)
//                 .toFormat("jpeg")
//                 .jpeg({ quality: 90 })
//                 .toFile(`public/img/funds/${filename}`);
//         }
//         req.body.proofs.push(filename);
//     });
//     next();
// };
const router = express.Router();
import {
    createFund,
    deleteFund,
    getAllFunds,
    updateFund,
    topFunds,
    getFund,
    Search
} from "../controllers/funds";
router.post("/create-fund", createFund);
router.delete("/delete-fund", deleteFund);
router.get("/get-all-funds", getAllFunds);
router.get("/top-funds", topFunds);
router.get('/get-fund/:id', getFund);
router.put("/update-fund", uploadFundImages, updateFund);
router.get('/search', Search);
module.exports = router;