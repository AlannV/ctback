const { Language } = require("../db");
const LANGUAGES = require("../dbData/dbLanguages");
const { onlyLettersCheck } = require("../helpers/validateInput");

const getLanguage = async (req, res, next) => {
  try {
    let response = await Language.findAll();
    response.length > 0
      ? res.status(200).json(response)
      : res.status(404).json({ message: "No languages were found" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createLanguage = async (req, res, next) => {
  let { name } = req.body;
  let check = onlyLettersCheck(name);
  if (check !== true) return res.status(412).json({ message: "Invalid Input" });

  try {
    let language = await Language.findOrCreate({
      where: { name },
      defaults: {
        name,
      },
    });
    language[0]._options.isNewRecord
      ? res.status(201).json({ message: "Language created" })
      : res.status(409).json({ message: "Language already exists" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const fillLanguageDb = async () => {
  const create = await Language.bulkCreate(
    LANGUAGES.map((l) => {
      return {
        name: l,
      };
    })
  );
  if (!create) {
    throw new Error("Error loading the languages into the database");
  } else {
    console.log("Languages succesfully loaded into the database");
  }
};

module.exports = {
  getLanguage,
  createLanguage,
  fillLanguageDb,
};
