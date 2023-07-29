const { User } = require("../db.js");
const userHelper = require("../helpers/userHelper.js");
const firebase = require("../firebase-config.js");

const checkUser = async (req, res) => {
  const uid = req.uid;

  try {
    const user = await User.findByPk(uid);
    if (user === null)
      return res.status(204).send({ message: "User no longer active" });
    return res.status(200).send({ email: user.email, name: user.name });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const usersResult = await User.findAll();
    res.status(200).json(usersResult);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const banUser = async (req, res) => {
  const { email } = req.body;

  try {
    await User.update(
      { active: false },
      {
        where: {
          email: email,
        },
      }
    );
    res.status(200).send({ message: "User is now inactive" });
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

const unBanUser = async (req, res) => {
  const { email } = req.body;

  try {
    const userExists = await userHelper.getUserID(email);
    if (userExists) {
      await User.update({ active: true }, { where: { email: email } });
      res.status(200).send();
    } else {
      res.status(404).send({ message: "Specified user does not exists" });
    }
  } catch (err) {
    res.status(500).send({ message: qweqweqwe.message });
  }
};

const modifyRole = async (req, res) => {
  const { email, role } = req.body;
  try {
    const userExists = await userHelper.getUserID(email);
    if (userExists) {
      await User.update({ role_id: role }, { where: { email: email } });
      res.status(200).send();
    } else {
      res.status(404).send({ message: "Specified user does not exists" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const passwordChange = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.send("All data must be sent");
  try {
    const user = await User.findOne({
      where: { email },
    });
    if (user) {
      const uid = user.user_id;
      const newPassword = await firebase.auth().updateUser(uid, {
        password: password,
      });
      return res.send(newPassword);
    }
    return res.status(404).send("User not found");
  } catch (error) {
    next(error);
  }
};

// GUARDA CON ESTA FUNC QUE ROMPE EL BACK
const deleteUser = async (req, res, next) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({
      where: { email },
    });
    if (user) {
      const uid = user.user_id;
      firebase
        .auth()
        .deleteUser(uid)
        .then(async () => {
          const deletedUser = await User.destroy({
            where: { email },
          });
          return res.send(deletedUser);
        });
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    res.send({ message: error.message });
  }
};

const passwordReset = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.send("Email must be sent");
  try {
    const linkReset = await firebase.auth().generatePasswordResetLink(email);
    res.send(linkReset);
  } catch (error) {
    next(error);
  }
};

const createUserByAdmin = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    await firebase
      .auth()
      .createUser({
        email: email,
        password: password,
        username: username,
      })
      .then(async (userRecord) => {
        const uid = userRecord.uid;
        const userByAdmin = await User.create({
          user_id: uid,
          name: username,
          email: email,
          role_id: role,
          password,
        });
        return res.send(userByAdmin);
      })
      .catch((error) => {
        console.error("Error creating new user:", error);
      });
  } catch (error) {
    console.error("Error creating new user", error);
    res.send({ message: error.message });
  }
};

const isAdmin = async (req, res) => {
  const uid = req.uid;

  try {
    userRole = await User.findByPk(uid);
    if (userRole.role_id === "A") {
      return res.status(200).send(true);
    } else {
      return res.status(202).send(false);
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createUser = async (req, res) => {
  console.log(req.body);
  const { email, username, role } = req.body;
  const uid = req.uid;

  if (!email || !username || email === "" || username === "")
    return res.status(400).send({
      message: "All creation fields must be sent, and they can't be empty",
    });

  try {
    await User.create({
      user_id: uid,
      name: username,
      email: email,
      role_id: "A",
      active: true,
    });
    return res.status(201).send({ message: "User created" });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = {
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
};
