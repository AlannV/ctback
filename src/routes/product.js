const { Router } = require("express");
const {
  activateProduct,
  deleteProduct,
  editProduct,
  createProduct,
  getProductById,
  getAllProducts,
} = require("../controllers/product");

const router = Router();

router
  .get("/", getAllProducts)
  .get("/:id", getProductById)
  .post("/create", createProduct)
  .put("/update/:id", editProduct)
  .delete("/delete/:id", deleteProduct)
  .put("/activate/:id", activateProduct);

module.exports = router;
