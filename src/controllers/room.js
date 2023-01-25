const { Room } = require("../db");
const { Op } = require("sequelize");

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

const activateRoom = async (id) => {
  const room = await Room.findByPk(id);
  if (room) {
    await room.update({
      active: true,
    });
    return true;
  } else {
    return false;
  }
};

const deleteRoom = async (id) => {
  const room = await Room.findByPk(id);
  if (room) {
    await room.update({
      active: false,
    });
    return true;
  } else {
    return false;
  }
};

const getRoomByName = async (name) => {
  return await Room.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
};

const putRooms = async (id, data) => {
  const { name, room_seats, display_type } = data;
  const room = await Room.findByPk(id);
  if (room) {
    const result = await room.update({
      name,
      room_seats,
      display_type,
    });
    return result;
  }
  return false;
};

const postRoom = async (data) => {
  const { name, room_seats, display_type } = data;
  const room = await Room.create({
    name,
    room_seats,
    display_type,
  });
  return room;
};

module.exports = {
  activateRoom,
  putRooms,
  getRoomByName,
  deleteRoom,
  getRoom,
  postRoom,
};
