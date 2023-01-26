const { Router } = require("express");
const {
  deleteRoom,
  getRoom,
  createRoom,
  putRooms,
  activateRoom,
  getRoomForDisplay,
} = require("../controllers/room");

const router = Router();

router
  .get("/", getRoom)
  .post("/create", createRoom)
  .delete("/delete/:id", deleteRoom)
  .put("/activate/:id", activateRoom)
  .put("/update/:id", putRooms)
  .get("/:displayMovie", getRoomForDisplay);

module.exports = router;
