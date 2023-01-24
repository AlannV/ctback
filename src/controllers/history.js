const { PurchaseHistory } = require("../db");

const getHistoryByUser = async (user_email) => {
  return await PurchaseHistory.findAll({
    where: {
      user_email,
    },
  });
};

const getHistoryActive = async () => {
  return await PurchaseHistory.findAll({
    where: {
      active: true,
    },
  });
};

const activeHistory = async (history_id) => {
  const history = await PurchaseHistory.findByPk(history_id);
  if (history) {
    await history.update({
      active: true,
    });
    return true;
  } else {
    return false;
  }
};

const deleteHistory = async (history_id) => {
  const history = await PurchaseHistory.findByPk(history_id);
  if (history) {
    await history.update({
      active: false,
    });
    return true;
  } else {
    return false;
  }
};

const getHistory = async () => {
  return await PurchaseHistory.findAll();
};

const getHistoryById = async (history_id) => {
  return await PurchaseHistory.findByPk(history_id);
};

const getHistoryDelete = async () => {
  return await PurchaseHistory.findAll({
    where: {
      active: false,
    },
  });
};

const postHistory = async (data) => {
  const {
    movie_id,
    seats,
    schedule_day,
    schedule_time,
    room,
    user_email,
    date,
    time,
    amount,
    state,
    product_qty,
  } = data;
  const history = await PurchaseHistory.create({
    movie_id: parseInt(movie_id),
    seats,
    schedule_day,
    schedule_time,
    room: parseInt(room),
    user_email,
    date,
    time,
    amount: parseFloat(amount),
    state,
    product_qty,
  });
  return history;
};

const putHistory = async (history_id, data) => {
  const {
    movie_id,
    seats,
    schedule_day,
    schedule_time,
    room,
    user_email,
    date,
    time,
    amount,
    state,
    product_qty,
  } = data;
  const history = await PurchaseHistory.update(
    {
      movie_id: parseInt(movie_id),
      seats,
      schedule_day,
      schedule_time,
      room: parseInt(room),
      user_email,
      date,
      time,
      amount: parseFloat(amount),
      state,
      product_qty,
    },
    {
      where: {
        history_id,
      },
    }
  );
  return history;
};

module.exports = {
  putHistory,
  getHistoryByUser,
  getHistoryActive,
  activeHistory,
  deleteHistory,
  getHistory,
  getHistoryById,
  getHistoryDelete,
  postHistory,
};
