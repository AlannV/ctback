const { Router } = require("express");
const router = Router();
const {
  contact,
  contactResponse,
  registerResponse,
  reviewResponse,
  purchaseResponse,
} = require("../controllers/mail");

router
  .post("/contact", contact)
  .post("/contact/response", contactResponse)
  .post("/register/response", registerResponse)
  .post("/review/response", reviewResponse)
  .post("/purchase/response", purchaseResponse);

module.exports = router;
