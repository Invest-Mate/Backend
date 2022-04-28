import express from "express";
import { PaymentForm, PayNow, Callback } from "./controllers/payment";
const router = express.Router();
router.get('/payment', PaymentForm);
router.post('/paynow', PayNow);
router.post('/callback', Callback)
module.exports = router;