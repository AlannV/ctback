const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Movie",
    {
      movie_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      poster: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
        },
      },
      teaser: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
        },
      },
      genre: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      display: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      classification: {
        type: DataTypes.STRING,
      },
      language: {
        type: DataTypes.STRING,
      },
      duration: {
        type: DataTypes.INTEGER,
      },
      cast: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      director: {
        type: DataTypes.STRING,
      },
      comingSoon: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
