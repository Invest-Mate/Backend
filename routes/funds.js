import express from "express";
const AppError = require("./../utils/appError");
const router = express.Router();
import { createFund } from "../controllers/funds";
router.post("/fund/create-fund", createFund);
module.exports = router;