const { Router } = require("express");
const { getDisplay, createDisplay } = require("../controllers/display.js");
const router = Router();

router.get("/", getDisplay).post("/", createDisplay);

module.exports = router;
