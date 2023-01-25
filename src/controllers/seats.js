const { Seat } = require("../db");
const SEATS = require("../dbData/dbSeats");

const getSeats = async (req, res, next) => {
  try {
    let response = await Seat.findAll();
    response.length > 0
      ? res.status(200).json(response)
      : res.status(404).json({ message: "No seats were found" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const fillSeatsDb = async () => {
  const create = await Seat.bulkCreate(
    SEATS.map((c) => {
      return {
        name: c.name,
        available: c.available,
      };
    })
  );
  if (!create) {
    throw new Error("Error loading the seats into the database");
  } else {
    console.log("Seats successfully loaded into the database");
  }
};
module.exports = {
  getSeats,
  fillSeatsDb,
};
