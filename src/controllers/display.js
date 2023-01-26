const { Display } = require("../db");
const DISPLAYS = require("../dbData/dbDisplay");
const { onlyLettersOrNumbersCheck } = require("../helpers/validateInput");

const getDisplay = async (req, res, next) => {
  try {
    let response = await Display.findAll();
    response.length > 0
      ? res.status(200).json(response)
      : res.status(404).json({ message: "No displays were found" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const createDisplay = async (req, res, next) => {
  let { name } = req.body;
  let check = onlyLettersOrNumbersCheck(name);
  if (check !== true) return res.status(500).json({ message: "Invalid Input" });
  try {
    await Display.findOrCreate({
      where: { name },
      defaults: {
        name,
      },
    });
    res.status(200).json({ message: "Display Created" });
  } catch (error) {
    res.status(400).json(error.message);
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
