const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Categories extends Model {}
Categories.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, { sequelize, modelName: "Categories", paranoid: true, timestamps: true });

module.exports = { Categories };
