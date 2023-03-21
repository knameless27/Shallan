const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

class Roles extends Model {}
Roles.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, { sequelize, modelName: "Roles", paranoid: true, timestamps: true });

module.exports = { Roles };
