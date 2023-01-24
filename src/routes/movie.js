const { Router } = require("express");
const {
  getMoviesById,
  getMoviesByParameter,
  postMovies,
  putMovies,
  activateMovies,
  deleteMovies,
} = require("../controllers/movie");

const router = Router();

router.get("/:id", getMoviesById);
router.get("/", getMoviesByParameter);
router.post("/create", postMovies);
router.put("/update/:id", putMovies);
router.put("/activate/:id", activateMovies);
router.delete("/delete/:id", deleteMovies);

module.exports = router;
