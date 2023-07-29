const { Router } = require("express");
const { Rating, Movie, User } = require("../db.js");
const router = Router();

router.get("/", );

router.get("/:movie_id", );

router.post("/create", );

router.put("/update/:rating_id", );

router.delete("/delete/:rating_id", async (req, res, next) => {
  const { rating_id } = req.params;

  try {
    const rating = await Rating.findByPk(parseInt(rating_id));
    if (rating) {
      await rating.destroy();
      res.send("Rating deleted");
    } else {
      res.send("No matches were found");
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
