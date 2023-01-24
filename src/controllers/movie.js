const { Movie } = require("../db");
const { Op } = require("sequelize");

const activateMovies = async (id) => {
  const movie = await Movie.findByPk(id);
  if (movie) {
    await movie.update({
      active: true,
    });
    return true;
  } else {
    return false;
  }
};

const deleteMovies = async (id) => {
  const movie = await Movie.findByPk(id);
  if (movie) {
    await movie.update({
      active: false,
    });
    return true;
  } else {
    return false;
  }
};

const getMovies = async () => {
  return await Movie.findAll();
};

const getMoviesByActive = async (active) => {
  return await Movie.findAll({
    where: {
      active: active,
    },
  });
};

const getMoviesById = async (id) => {
  return await Movie.findByPk(id);
};

const getMoviesByName = async (name) => {
  return await Movie.findAll({
    where: {
      title: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
};

const getMoviesByNameAndActive = async (name, active) => {
  return await Movie.findAll({
    where: {
      title: {
        [Op.iLike]: `%${name}%`,
      },
      active: active,
    },
  });
};

const getMoviesByParameter = async (name, active) => {
  if (name && active !== undefined)
    return await getMoviesByNameAndActive(name, active);

  if (name) return await getMoviesByName(name);

  if (active !== undefined) return await getMoviesByActive(active);

  return await getMovies();
};

const postMovies = async (data) => {
  const {
    title,
    description,
    poster,
    image_1,
    image_2,
    teaser,
    genre,
    display,
    classification,
    cast,
    director,
    writter,
    language,
    duration,
    comingSoon,
  } = data;

  const movie = await Movie.create({
    title,
    description,
    poster,
    image_1,
    image_2,
    teaser,
    genre,
    display,
    duration: parseInt(duration),
    classification,
    cast,
    director,
    writter,
    language,
    comingSoon: comingSoon === "true" ? true : false,
  });
  return movie;
};

const putMovies = async (id, data) => {
  const {
    title,
    description,
    poster,
    image_1,
    image_2,
    teaser,
    genre,
    display,
    classification,
    cast,
    director,
    writter,
    language,
    duration,
    comingSoon,
  } = data;

  const movie = await Movie.findByPk(id);
  if (movie) {
    const result = await movie.update({
      title,
      description,
      poster,
      image_1,
      image_2,
      teaser,
      genre,
      display,
      classification,
      cast,
      director,
      writter,
      language,
      duration: parseInt(duration),
      comingSoon: comingSoon === "true" ? true : false,
    });
    return result;
  }
  return false;
};

module.exports = {
  activateMovies,
  deleteMovies,
  getMovies,
  getMoviesByActive,
  getMoviesById,
  getMoviesByParameter,
  postMovies,
  putMovies,
};
