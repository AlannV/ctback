const { Movie } = require("../db");
const {
  getMoviesByNameAndActive,
  getMoviesByName,
  getMoviesByActive,
  getMovies,
} = require(`./movieHelpers.js`);

const getMoviesById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id);
    movie
      ? res.status(200).json(movie)
      : res.status(404).json({ message: "Movie not found" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const getMoviesByParameter = async (req, res, next) => {
  const { name, active } = req.query;
  try {
    if (name && active) {
      let movie = await getMoviesByNameAndActive(name, active);
      return movie.length > 0
        ? res.status(200).json(movie)
        : res
            .status(404)
            .json({ message: "No movie found with the specified criteria" });
    }

    if (name) {
      let movie = await getMoviesByName(name);
      return movie.length > 0
        ? res.status(200).json(movie)
        : res.status(404).json({ message: "No movie found with that name" });
    }

    if (active) {
      let movie = await getMoviesByActive(active);
      return movie.length > 0
        ? res.status(200).json(movie)
        : res
            .status(404)
            .json({ message: "No movie found with the specified criteria" });
    }

    if (!name && !active) {
      let movies = await getMovies();
      return movies.length > 0
        ? res.status(200).json(movies)
        : res.status(404).json({ message: "No movies found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const postMovies = async (req, res, next) => {
  const {
    title,
    description,
    poster,
    teaser,
    genre,
    display,
    classification,
    cast,
    director,
    language,
    duration,
    comingSoon,
  } = req.body;

  try {
    const created = await Movie.findOrCreate({
      where: { title },
      defaults: {
        title,
        description,
        poster,
        teaser,
        genre,
        display,
        duration: parseInt(duration),
        classification,
        cast,
        director,
        language,
        comingSoon: comingSoon === "true" ? true : false,
      },
    });
    !created
      ? res.status(400).json({ message: "Movie already exists" })
      : res.status(200).json({ message: "Movie created" });
  } catch (error) {
    next(error);
  }
};

const putMovies = async (req, res, next) => {
  const {
    title,
    description,
    poster,
    teaser,
    genre,
    display,
    classification,
    cast,
    director,
    language,
    duration,
    comingSoon,
  } = req.body;

  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) res.status(404).json({ message: "Movie not found" });
    const movieUpdated = await movie.update({
      title,
      description,
      poster,
      teaser,
      genre,
      display,
      classification,
      cast,
      director,
      language,
      duration: parseInt(duration),
      comingSoon: comingSoon === "true" ? true : false,
    });
    if (movieUpdated) res.status(201).json({ message: "Movie edited" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const activateMovies = async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id);
    await movie.update({
      active: true,
    });
    res.status(201).json({ message: "Movie activated" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const deleteMovies = async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id);
    await movie.update({
      active: false,
    });
    res.status(201).json({ message: "Movie deactivated" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  getMoviesById,
  getMoviesByParameter,
  postMovies,
  putMovies,
  activateMovies,
  deleteMovies,
};
