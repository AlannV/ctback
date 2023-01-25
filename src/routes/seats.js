const { Router } = require("express");
const { getSeats } = require("../controllers/seats.js");
const router = Router();

router.get("/", getSeats);

module.exports = router;
