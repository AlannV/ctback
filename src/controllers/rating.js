const { Rating } = require("../db");

const getRatings = async (req, res, next) => {
  const { rating_id } = req.query;

  if (rating_id) {
    try {
      const rating = await Rating.findByPk(rating_id, {
        include: [
          {
            model: Movie,
            attributes: ["movie_id"],
          },
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
      const result = {
        rating_id: rating.rating_id,
        movie_id: rating.movie_id,
        rate: rating.rate,
        review: rating.review,
        user: rating.User,
      };
      if (result) {
        res.json(result);
      } else {
        res.send("No matches were found");
      }
    } catch (e) {
      next(e);
    }
  } else {
    try {
      const ratings = await Rating.findAll({
        include: [
          {
            model: Movie,
            attributes: ["movie_id"],
          },
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
      const result = ratings.map((rating) => {
        return {
          rating_id: rating.rating_id,
          movie_id: rating.movie_id,
          rate: rating.rate,
          review: rating.review,
          user: rating.User,
        };
      });
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
};

async (req, res, next) => {
  const { movie_id } = req.params;

  try {
    const rating = await Rating.findAll({
      where: {
        movie_id,
      },
      include: [
        {
          model: Movie,
          attributes: ["movie_id"],
        },
        {
          model: User,
          attributes: ["name", "email"],
        },
      ],
    });
    const result = rating.map((rating) => {
      return {
        rating_id: rating.rating_id,
        movie_id: rating.movie_id,
        rate: rating.rate,
        review: rating.review,
        user: rating.User,
      };
    });
    if (result) {
      res.json(result);
    } else {
      res.send("No matches were found");
    }
  } catch (e) {
    next(e);
  }
};

async (req, res, next) => {
  if (!req.body) res.send("The form is empty");

  try {
    const { rate, review, movie_id, email } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    const rating = await Rating.create({
      rate: parseInt(rate),
      review,
      movie_id: parseInt(movie_id),
      user_id: user.user_id,
    });

    const result = {
      rating_id: rating.rating_id,
      movie_id: rating.movie_id,
      rate: rating.rate,
      review: rating.review,
    };

    res.json(result);
  } catch (e) {
    next(e);
  }
};

async (req, res, next) => {
  const { rating_id } = req.params;

  if (!req.body) res.send("The form is empty");

  try {
    const { movie_id, email, rate, review } = req.body;
    const rating = await Rating.findByPk(parseInt(rating_id));
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (rating) {
      await rating.update({
        rate: parseInt(rate),
        review,
        movie_id: parseInt(movie_id),
        user_id: user.user_id,
      });
      const result = {
        rating_id: rating.rating_id,
        movie_id: rating.movie_id,
        rate: rating.rate,
        review: rating.review,
      };
      res.json(result);
    } else {
      res.send("No matches were found");
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getRatings,
};
