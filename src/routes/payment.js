const { Router } = require("express");
const { getUID } = require("../middlewares/auth.js");
const payment = Router();

const {
  createPurchase,
  revertPurchase,
  followUpPayment,
  paymentById,
} = require("../controllers/payment.js");

payment.post("/", getUID, createPurchase);
payment.put("/revertPurchase", revertPurchase);
payment.get("/followUp", followUpPayment);
payment.get("/pagos/:id", paymentById);

module.exports = payment;
