const { Classification } = require("../db");
const CLASSIFICATIONS = require("../dbData/dbClassifications");
const { onlyLettersOrNumbersCheck } = require("../helpers/validateInput");

const createClassification = async (req, res, next) => {
  const { name } = req.body;
  const check = onlyLettersOrNumbersCheck(name);
  if (check !== true) return res.status(500).json({ message: "Invalid input" });
  try {
    await Classification.findOrCreate({
      where: { name },
      defaults: {
        name,
      },
    });
    res.status(200).json({ message: "Classification Created" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getClassifications = async (req, res, next) => {
  try {
    let response = await Classification.findAll();
    response.length > 0
      ? res.status(200).json(response)
      : res.status(404).json({ message: "No classifications were found" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const fillClassificationDb = async () => {
  const create = await Classification.bulkCreate(
    CLASSIFICATIONS.map((c) => {
      return {
        name: c,
      };
    })
  );
  if (!create) {
    throw new Error("Error loading the classifications into the database");
  } else {
    console.log("Classifications successfully loaded into the database");
  }
};

module.exports = {
  getClassifications,
  createClassification,
  fillClassificationDb,
};
