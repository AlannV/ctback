const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "BoughtSeats",
    {
      selection_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      seat_numbers: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      purchase_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
