const { Router } = require("express");
require("dotenv").config();
const { checkActiveUser, getUID } = require("../middlewares/auth.js");

const {
  checkUser,
  getAllUsers,
  banUser,
  unBanUser,
  modifyRole,
  passwordChange,
  deleteUser,
  passwordReset,
  createUserByAdmin,
  isAdmin,
  createUser,
} = require("../controllers/user");

const users = Router();

//Valida que el usuario exista, o que la sesion no haya terminado
users
  .get("/isActive", checkActiveUser, checkUser)
  .get("/getAll", getAllUsers)
  .put("/banUser", banUser)
  .put("/modifyRole", modifyRole)
  .put("/unbanUser", unBanUser)
  .post("/createUser", getUID, createUser)
  .post("/isAdmin", getUID, isAdmin)
  .post("/createUserByAdmin", createUserByAdmin)
  .delete("/deleteUser", deleteUser)
  .post("/passwordReset", passwordReset)
  .put("/passwordChange", passwordChange);
module.exports = users;
