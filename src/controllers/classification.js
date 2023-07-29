const { Classification } = require("../db");
const CLASSIFICATIONS = require("../dbData/dbClassifications");
const { onlyLettersOrNumbersCheck } = require("../helpers/validateInput");

const getClassifications = async (req, res, next) => {
  try {
    let response = await Classification.findAll({
      attributes: ["name"],
    });
    response.length > 0
      ? res.status(200).json(response)
      : res.status(404).json({ message: "No classifications were found" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createClassification = async (req, res, next) => {
  const { name } = req.body;
  const check = onlyLettersOrNumbersCheck(name);
  if (check !== true) return res.status(412).json({ message: "Invalid input" });

  try {
    let classification = await Classification.findOrCreate({
      where: { name },
      defaults: {
        name,
      },
    });
    classification[0]._options.isNewRecord
      ? res.status(201).json({ message: "Classification Created" })
      : res.status(409).json({ message: "Classification already exists" });
  } catch (error) {
    res.status(500).json(error.message);
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
