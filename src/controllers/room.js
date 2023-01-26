const { Room } = require("../db");
const { Op } = require("sequelize");
const {
  onlyLettersCheck,
  isArrayOfStrigs,
  onlyNumbersCheck,
} = require("../helpers/validateInput");

const createRoom = async (req, res, next) => {
  const { name, room_seats, display_type } = req.body;

  let check = onlyLettersCheck(name);
  let checkSeats = isArrayOfStrigs(room_seats);
  let checkDisplay = isArrayOfStrigs(display_type);

  if (check !== true && checkSeats !== true && checkDisplay !== true)
    return res.status(500).json({ message: "Invalid Input" });
  if (!name || !room_seats || !display_type) {
    return res.status(500).json({ message: "Incomplete data" });
  }
  try {
    await Room.findOrCreate({
      where: { name },
      defaults: {
        name,
        room_seats,
        display_type,
      },
    });
    res.status(200).json({ message: "Room Created" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getRoom = async (req, res, next) => {
  try {
    let response = await Room.findAll();
    response.length > 0
      ? res.status(200).json(response)
      : res.status(404).json({ message: "No rooms were found" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const activateRoom = async (req, res, next) => {
  const { id } = req.params;
  const check = onlyNumbersCheck(id);
  if (check !== true) return res.status(500).json({ message: "Invalid input" });

  try {
    const room = await Room.findByPk(id);
    if (room) {
      await room.update({
        active: true,
      });
      res.status(201).json({ message: "Room activated" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteRoom = async (req, res, next) => {
  const { id } = req.params;
  const check = onlyNumbersCheck(id);
  if (check !== true) return res.status(500).json({ message: "Invalid input" });

  try {
    const room = await Room.findByPk(id);
    if (room) {
      await room.update({
        active: false,
      });
      res.status(201).json({ message: "Room deactivated" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const putRooms = async (req, res, next) => {
  const { id } = req.params;
  const { name, room_seats, display_type } = req.body;

  let check = onlyLettersCheck(name);
  let checkSeats = isArrayOfStrigs(room_seats);
  let checkDisplay = isArrayOfStrigs(display_type);

  if (check !== true && checkSeats !== true && checkDisplay !== true)
    return res.status(500).json({ message: "Invalid Input" });
  if (!name || !room_seats || !display_type)
    return res.status(500).json({ message: "Incomplete data" });

  try {
    const room = await Room.findByPk(id);
    if (room) {
      await room.update({
        name,
        room_seats,
        display_type,
      });
      res.status(200).json({ message: "Room Updated" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getRoomForDisplay = async (req, res, next) => {
  const { displayMovie } = req.params;

  try {
    const getRooms = await getRoom();
    const arrMovies = [];
    getRooms.forEach((element) => {
      if (element.display_type.includes(displayMovie.toUpperCase())) {
        arrMovies.push(element);
      }
    });
    res.status(200).json(arrMovies);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  activateRoom,
  putRooms,
  deleteRoom,
  getRoom,
  createRoom,
  getRoomForDisplay,
};
