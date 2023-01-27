const { Router } = require("express");
const { userFavs, getAllFavs } = require("../controllers/favorite");

const router = Router();

router.put("/userFavs/:user_id", userFavs).get("/getFav/:user_id", getAllFavs);

module.exports = router;
