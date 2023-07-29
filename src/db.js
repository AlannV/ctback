require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DEPLOY } = process.env;

// DB_URI
// `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
const sequelize = new Sequelize(DB_DEPLOY, {
  dialect: "postgresql",
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false,
  //   },
  // },
  logging: false,
  native: false,
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });
modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const {
  User,
  Movie,
  ShoppingCart,
  Display,
  Genre,
  Product,
  Purchase,
  ProductDetail,
  ScheduleDetail,
  Rating,
  Room,
  Schedule,
  Language,
  Classification,
  Seat,
} = sequelize.models;

User.hasMany(Purchase, { foreignKey: "user_id" });
Purchase.belongsTo(User, { foreignKey: "user_id" });
Purchase.hasMany(ProductDetail, { foreignKey: "purchase_id" });
ProductDetail.belongsTo(Purchase, { foreignKey: "purchase_id" });
Purchase.hasMany(ScheduleDetail, { foreignKey: "purchase_id" });
ScheduleDetail.belongsTo(Purchase, { foreignKey: "purchase_id" });

User.hasOne(ShoppingCart, { foreignKey: "user_id" });
ShoppingCart.belongsTo(User, { foreignKey: "user_id" });

// rating relations
Rating.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Rating, { foreignKey: "user_id" });
Rating.belongsTo(Movie, { foreignKey: "movie_id" });
Movie.hasMany(Rating, { foreignKey: "movie_id" });

ProductDetail.belongsTo(Product, { foreignKey: "product_id" });
Product.hasMany(ProductDetail, { foreignKey: "product_id" });

Schedule.belongsTo(Movie, { foreignKey: "movie_id" });
Movie.hasMany(Schedule, { foreignKey: "movie_id" });
ScheduleDetail.belongsTo(Schedule, { foreignKey: "schedule_id" });
Schedule.hasMany(Schedule, { foreignKey: "schedule_id" });
Schedule.belongsTo(Room, { foreignKey: "room_id" });
Room.hasMany(Schedule, { foreignKey: "room_id" });

Display.belongsToMany(Movie, { through: "movie_display" });
Movie.belongsToMany(Display, { through: "movie_display" });

Genre.belongsToMany(Movie, { through: "movie_genre" });
Movie.belongsToMany(Genre, { through: "movie_genre" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};
