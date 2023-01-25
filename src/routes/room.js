const { Router } = require("express");
const {
  deleteRoom,
  getRoom,
  postRoom,
  putRooms,
  activateRoom,
} = require("../controllers/room");

const router = Router();

router.get("/", getRoom);

//! Busca las rooms por tipo de display (2D, 3D, 4D, 5D, 6D...)

router.get("/:displayMovie", async (req, res, next) => {
  try {
    const getRooms = await getRoom();
    const { displayMovie } = req.params;
    const arrMovies = [];
    getRooms.forEach((element) => {
      if (element.display_type.includes(displayMovie.toUpperCase())) {
        arrMovies.push(element);
      }
    });
    res.send(arrMovies);
  } catch (error) {
    next(error);
  }
});
//! Crea las rooms (A pesar de tener qué ser un valor estático)
router.post("/create", async (req, res, next) => {
  if (!req.body) res.send("The form is empty");
  try {
    const room = await postRoom(req.body);
    res.json(room);
  } catch (error) {
    next(error);
  }
});
//! Edita la room
router.put("/update/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!req.body) return res.send("The form is empty");
  try {
    const room = await putRooms(id, req.body);
    if (room) return res.send(room);
    else return res.send("No matches were found");
  } catch (error) {
    next(e);
  }
});

//! Adiós room
router.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await deleteRoom(id);
    if (result) res.json(result);
    else {
      res.send("No matches were found");
    }
  } catch (e) {
    next(e);
  }
});

//! Activar room
router.delete("/activate/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await activateRoom(id);
    if (result) res.status(200).json(result);
    else {
      res.send("No matches were found");
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
