import express from "express";
import { PaymentForm, PayNow, Callback } from "../controllers/payment";
const router = express.Router();
const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });
router.get('/payment', PaymentForm);
router.post('/paynow', [parseUrl, parseJson], PayNow);
router.post('/callback', Callback)
module.exports = router;