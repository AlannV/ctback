const { User } = require("../db");

const userFavs = async (req, res, next) => {
  const { user_id } = req.params;
  const { movie_id, val } = req.body;

  try {
    const user = await User.findByPk(user_id);
    if (user) {
      const aux = user.favMovieId;
      if (val) {
        if (!aux.includes(movie_id)) {
          const favMovie = await user.update({
            favMovieId: [...aux, movie_id],
          });
          return res.status(200).json(favMovie);
        } else {
          const favMovie = await user.update({
            favMovieId: [...aux],
          });
          return res.status(200).json(favMovie);
        }
      } else {
        if (aux.includes(movie_id)) {
          const favMovie = await user.update({
            favMovieId: aux.filter((e) => e !== movie_id),
          });
          return res.status(200).json(favMovie);
        } else {
          const favMovie = await user.update({
            favMovieId: [...aux],
          });
          return res.status(200).json(favMovie);
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

const getAllFavs = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const userFavMovies = await User.findByPk(user_id, {
      attributes: ["favMovieId"],
    });
    res.status(200).json(userFavMovies);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  userFavs,
  getAllFavs,
};
