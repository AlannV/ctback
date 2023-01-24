const { Movie } = require("../db");
const { Op } = require("sequelize");

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

const getMoviesByName = async (name) => {
  return await Movie.findAll({
    where: {
      title: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
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

module.exports = {
  getMoviesByNameAndActive,
  getMoviesByName,
  getMovies,
  getMoviesByActive,
};
