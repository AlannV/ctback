const { Router } = require("express");

const { getLanguage, createLanguage } = require("../controllers/language.js");
const router = Router();

router.get("/", getLanguage).post("/", createLanguage);

module.exports = router;
