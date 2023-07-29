const { Display } = require("../db");
const DISPLAYS = require("../dbData/dbDisplay");
const { onlyLettersOrNumbersCheck } = require("../helpers/validateInput");

const getDisplay = async (req, res, next) => {
  try {
    let response = await Display.findAll({
      attributes: ["name"],
    });
    response.length > 0
      ? res.status(200).json(response)
      : res.status(404).json({ message: "No displays were found" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createDisplay = async (req, res, next) => {
  let { name } = req.body;
  let check = onlyLettersOrNumbersCheck(name);
  if (check !== true) return res.status(412).json({ message: "Invalid Input" });
  try {
    let display = await Display.findOrCreate({
      where: { name },
      defaults: {
        name,
      },
    });
    display[0]._options.isNewRecord
      ? res.status(201).json({ message: "Display Created" })
      : res.status(409).json({ message: "Display already exists" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const fillDisplayDb = async () => {
  const create = await Display.bulkCreate(
    DISPLAYS.sort().map((d) => {
      return {
        name: d,
      };
    })
  );
  if (!create) {
    throw new Error("Error loading the displays into the database");
  } else {
    console.log("Displays successfully loaded into the database");
  }
};

module.exports = {
  getDisplay,
  createDisplay,
  fillDisplayDb,
};
