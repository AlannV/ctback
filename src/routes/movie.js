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

router
  .get("/:id", getMoviesById)
  .get("/", getMoviesByParameter)
  .post("/create", postMovies)
  .put("/update/:id", putMovies)
  .put("/activate/:id", activateMovies)
  .delete("/delete/:id", deleteMovies);

module.exports = router;
