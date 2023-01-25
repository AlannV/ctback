const { Language } = require("../db");
const LANGUAGES = require("../dbData/dbLanguages");

const getLanguage = async (req, res, next) => {
  try {
    let response = await Language.findAll();
    response.length > 0
      ? res.status(200).json(response)
      : res.status(404).json({ message: "No languages were found" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const createLanguage = async (req, res, next) => {
  let { name } = req.body;
  try {
    await Language.findOrCreate({
      where: { name },
      defaults: {
        name,
      },
    });
    res.status(200).json({ message: "Language created" });
  } catch (error) {
    res.status(400).json(error.message);
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
