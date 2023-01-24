const { Purchase, ProductDetail, User, Product } = require("../db");
const { Op } = require("sequelize");
/* const { Purchase, ProductDetail, ScheduleDetail } = require("../db");

const postPurchase = async (data) => {
  const {
    amount,
    status_id,
    product_quantity,
    schedule_quantity,
    seat_numbers,
  } = data;

  const purchase = await Purchase.create({
    amount: parseFloat(amount),
    status_id: status_id === "true" ? true : false,
  });
  const productDetail = await ProductDetail.create({
    purchase_id: purchase.purchase_id, // no esta en el model pero desconozco si hay que incluirlo por tema de la relación.
    product_quantity: parseInt(product_quantity),
  });
  const scheduleDetail = await ScheduleDetail.create({
    purchase_id: purchase.purchase_id, // no esta en el model pero desconozco si hay que incluirlo por tema de la relación.
    schedule_quantity: parseInt(schedule_quantity),
    seat_numbers, // verificar si por body se recibe el json o si hay que convertirlo.
  });
  return purchase;
};

module.exports = {
  postPurchase,
};
 */

const postPurchase = async (data) => {
  const purchase = await Purchase.create({
    include: [
      {
        model: User,
        attributes: ["user_id"],
        through: {
          attributes: [],
        },
      },
    ],
    include: [
      {
        model: ProductDetail,
        attributes: ["product_detail_id"],
        through: {
          attributes: [],
        },
      },
    ],
  });
};

const deletePurchase = async (purchase_id) => {
  const purchase = await Purchase.findByPk(purchase_id);
  if (purchase) {
    await purchase.update({
      active: false,
    });
    return true;
  } else {
    return false;
  }
};

const formatData = async (data) => {
  let productDetails = JSON.parse(JSON.stringify(data.ProductDetails));
  let scheduleDetail = JSON.parse(JSON.stringify(data.ScheduleDetails[0]));
  let productIDs = [];

  productDetails.forEach((productRecord) => {
    productRecord.product_id = productRecord.Product.product_id;
    productIDs.push(productRecord.Product.product_id);
  });
  let productStocks = await Product.findAll({
    where: {
      product_id: {
        [Op.in]: productIDs,
      },
    },
    attributes: ["product_id", "stock"],
  });
  productDetails.forEach((productRecord) => {
    let stockForProduct = productStocks.filter(
      (product) => product.product_id === productRecord.product_id
    );
    const newStock = stockForProduct[0].stock + productRecord.product_quantity;
    productRecord.newStock = newStock;
  });
  scheduleDetail.schedule_id = scheduleDetail.Schedule.schedule_id;
  scheduleDetail.boughtSeats = scheduleDetail.Schedule.boughtSeats;
  scheduleDetail.newFreeSeats = scheduleDetail.boughtSeats.filter(
    (seat) => !scheduleDetail.seat_numbers.includes(seat)
  );
  let results = {
    productDetails,
    scheduleDetail,
  };
  return results;
};

module.exports = {
  deletePurchase,
  postPurchase,
  formatData,
};
