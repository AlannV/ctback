const { Genre } = require("../db");
const GENRES = require("../dbData/dbGenres");
const { onlyLettersCheck } = require("../helpers/validateInput");

const getGenres = async (req, res, next) => {
  try {
    let response = await Genre.findAll();
    response.length > 0
      ? res.status(200).json(response)
      : res.status(404).json({ message: "No genres were found" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const createGenre = async (req, res, next) => {
  let { name } = req.body;
  let check = onlyLettersCheck(name);
  if (check !== true) return res.status(500).json({ message: "Invalid Input" });

  try {
    await Genre.findOrCreate({
      where: { name },
      defaults: {
        name,
      },
    });
    res.status(200).json({ message: "Genre created" });
  } catch (error) {
    console.error(error);
  }
};

const fillGenreDb = async (req, res, next) => {
  const create = await Genre.bulkCreate(
    GENRES.map((g) => {
      return { name: g };
    })
  );
  if (!create) {
    throw new Error("Error loading the genres into the database");
  } else {
    console.log("Genres successfully loaded into the database");
  }
};
module.exports = {
  getGenres,
  createGenre,
  fillGenreDb,
};
