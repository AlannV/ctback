const { Product } = require("../db.js");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    products.length > 0
      ? res.status(200).json(products)
      : res.status(404).json({ message: "No products were found" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createProduct = async (req, res, next) => {
  const { name, price, stock, image } = req.body;
  try {
    const product = await Product.findOrCreate({
      where: { name },
      defaults: {
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        image,
      },
    });
    res.status(201).json({ message: "Product created" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    product
      ? res.status(200).json(product)
      : res.status(404).json({ message: "No matches were found" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const editProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, price, stock, image } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (product) {
      await product.update({
        name,
        price,
        stock,
        image,
      });
      res.status(200).json({ message: "Product edited" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    await product.update({
      active: false,
    });
    res.status(200).json({ message: "Product deactivated" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const activateProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    await product.update({
      active: true,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  activateProduct,
  deleteProduct,
  editProduct,
  createProduct,
  getProductById,
  getAllProducts,
};
