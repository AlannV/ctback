const { Room } = require("../db");
const { Op } = require("sequelize");

const getRoom = async () => {
  const movie = await Room.findAll();
  return movie;
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
