const { Router } = require("express");

const {
  getClassifications,
  createClassification,
} = require("../controllers/classification.js");
const router = Router();

router.get("/", getClassifications).post("/", createClassification);

module.exports = router;
