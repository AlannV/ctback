const { Router } = require("express");

const { getGenres, createGenre } = require("../controllers/genre.js");
const router = Router();

router.get("/", getGenres).post("/", createGenre);

module.exports = router;
