require("dotenv").config();
const {
  ACCESS_TOKEN,
  FRONT_URL_SUCCESS,
  FRONT_URL_PENDING,
  FRONT_URL_FAILED,
  BACK_URL_SUCCESS,
  BACK_URL_FAILED,
  BACK_URL_PENDING,
} = process.env;

const mercadopago = require("mercadopago");

const formatData = require("../controllers/purchase.js");
const { Op } = require("sequelize");

const {
  Purchase,
  ProductDetail,
  ScheduleDetail,
  Schedule,
  Product,
} = require("../db.js");

mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

const createPurchase = async (req, res, next) => {
  const { productsBuy, scheduleId } = req.body;
  const uid = req.uid;
  try {
    const mp_items = productsBuy.map((product) => ({
      id: product.id,
      title: product.name,
      unit_price: product.price,
      quantity: product.quantity,
      currency_id: "USD",
    }));
    mp_items.push({
      id: scheduleId.schedule_id,
      title: scheduleId.movie,
      unit_price: scheduleId.selected.length * 5,
      quantity: scheduleId.selected.length,
      currency_id: "USD",
    });
    //Consigue el total de la compra
    const productsTotalAmount = productsBuy.map(
      (product) => product.quantity * product.price
    );
    let purchaseTotalAmount = 0;
    productsTotalAmount.forEach((amount) => {
      purchaseTotalAmount += amount;
    });

    //Crea la compra en status 'created'
    const newPurchase = await Purchase.create({
      amount: purchaseTotalAmount,
      status: "created",
      user_id: uid,
    });

    //Recupera los asientos ocupados
    const scheduleData = await Schedule.findByPk(scheduleId.schedule_id, {
      attributes: ["boughtSeats"],
    });

    //Extrae la data de asientos ocupados, agrega los asientos seleccionados al usuario, y modifica el schedule
    const scheduleBoughtSeats = [...scheduleData.dataValues.boughtSeats];
    scheduleId.selected.forEach((seat) => scheduleBoughtSeats.push(seat));
    const scheduleSeatsMod = await Schedule.update(
      { boughtSeats: scheduleBoughtSeats },
      {
        where: {
          schedule_id: scheduleId.schedule_id,
        },
      }
    );

    //Crea los detalles de compra de los productos
    let newProductDetails = [];
    productsBuy.forEach(async (product) => {
      const insertProductDetail = await ProductDetail.create({
        product_quantity: product.quantity,
        price: product.price,
        purchase_id: newPurchase.purchase_id,
        product_id: product.id,
      });
    });

    //Recupera el precio de la entrada de la funcion
    const ticketPrice = await Schedule.findByPk(scheduleId.schedule_id, {
      attributes: ["price"],
    });

    //Crea el detalle de compra de funcion
    let newScheduleDetail = await ScheduleDetail.create({
      schedule_quantity: scheduleId.selected.length,
      seat_numbers: scheduleId.selected,
      price: ticketPrice * scheduleId.selected.length,
      purchase_id: newPurchase.purchase_id,
      schedule_id: scheduleId.schedule_id,
    });

    //Actualiza stock
    const extractedIDs = productsBuy.map((product) => product.id);
    const stocks = await Product.findAll({
      where: {
        product_id: {
          [Op.in]: extractedIDs,
        },
      },
      attributes: ["product_id", "stock"],
    });
    const extractedStocks = stocks.map((stockItem) => {
      const relatedProduct = productsBuy.filter(
        (product) => product.id === stockItem.dataValues.product_id
      );
      return {
        stock: stockItem.dataValues.stock,
        id: stockItem.dataValues.product_id,
        user_selected_product: relatedProduct[0].quantity,
      };
    });
    extractedStocks.forEach(async (product) => {
      await Product.update(
        {
          stock: product.stock - product.user_selected_product,
        },
        {
          where: {
            product_id: {
              [Op.eq]: product.id,
            },
          },
        }
      );
    });

    //Realiza la configuracion de todo lo de mercadopago
    let mpPreference = {
      items: mp_items,
      external_reference: newPurchase.purchase_id.toString(),
      payment_methods: {
        excluded_payment_types: [
          {
            id: "atm",
          },
        ],
        installments: 3,
      },
      back_urls: {
        success: BACK_URL_SUCCESS,
        failure: BACK_URL_FAILED,
        pending: BACK_URL_PENDING,
      },
    };
    mercadopago.preferences
      .create(mpPreference)
      .then((response) => {
        global.id = response.body.id;
        return res
          .status(200)
          .send({ id: global.id, purchase_id: newPurchase.purchase_id });
      })
      .catch((err) => {
        console.error(err);
        return res.status(400).send(err);
      });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

const revertPurchase = async (req, res) => {
  const { purchase_id } = req.body;
  try {
    const relatedData = await Purchase.findByPk(purchase_id, {
      attributes: ["purchase_id"],
      include: [
        {
          model: ProductDetail,
          attributes: ["product_detail_id", "product_quantity"],
          include: [
            {
              model: Product,
              attributes: ["product_id"],
            },
          ],
        },
        {
          model: ScheduleDetail,
          attributes: ["detail_id", "seat_numbers"],
          include: [
            {
              model: Schedule,
              attributes: ["schedule_id", "boughtSeats"],
            },
          ],
        },
      ],
    });

    const { productDetails, scheduleDetail } = await formatData(relatedData);

    await productDetails.forEach(async (boughtProduct) => {
      await Product.update(
        { stock: boughtProduct.newStock },
        {
          where: {
            product_id: boughtProduct.product_id,
          },
        }
      );
    });

    await Schedule.update(
      { boughtSeats: scheduleDetail.newFreeSeats },
      {
        where: {
          schedule_id: scheduleDetail.schedule_id,
        },
      }
    );

    await Purchase.update(
      { status: "Auto-Cancelled Cart" },
      {
        where: {
          purchase_id: purchase_id,
        },
      }
    );

    return res
      .status(200)
      .json({ message: `Purchase ${purchase_id} reverted` });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

const followUpPayment = async (req, res) => {
  const payment_status = req.query.status;
  let status = payment_status === "approved" ? "Approved" : "Pay In Process";
  switch (status) {
    case "Approved":
      return res.redirect(FRONT_URL_SUCCESS);
    case "Pay In Process":
      return res.redirect(FRONT_URL_PENDING);
    default:
      return res.redirect(FRONT_URL_FAILED);
  }
};

const paymentById = async (req, res) => {
  const mp = new mercadopago(ACCESS_TOKEN);
  const id = req.params.id;
  try {
    const resultado = await mp.get(`/v1/payments/search`, { id: id });
    res.status(200).json(resultado);
  } catch (error) {
    console.error("Error searching:", err);
    res.status(400).json(error);
  }
};

module.exports = {
  createPurchase,
  revertPurchase,
  followUpPayment,
  paymentById,
};
