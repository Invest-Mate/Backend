import express from "express";
const AppError = require("./../utils/appError");
const router = express.Router();
import { createFund, deleteFund } from "../controllers/funds";
router.post("/fund/create-fund", createFund);
router.delete("/fund/delete-fund", deleteFund)
module.exports = router;