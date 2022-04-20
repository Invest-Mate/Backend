import express from "express";
const AppError = require("./../utils/appError");
import sharp from "sharp";
const multer = require("multer"); //multer imported
// const upload = multer({ dest: "public/img/users" });
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

var resizeUserPhoto = async(req, res, next) => {
    if (!req.file) return next();

    req.file.filename = `user-${req.body.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/users/${req.file.filename}`);
    next();
};

const router = express.Router();
import {
    createUser,
    updateUser,
    pushCards,
    getUser,
    deleteUser,
} from "../controllers/user";
router.post("/user/create-user", createUser);
router.put("/user/update-user", upload.single("photo"), resizeUserPhoto, updateUser);
router.put("/user/push-cards", pushCards);
router.get("/user/get-user", getUser);
router.delete("/user/delete-user", deleteUser);
module.exports = router;