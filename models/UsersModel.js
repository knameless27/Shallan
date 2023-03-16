const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

class Users extends Model {}
Users.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, { sequelize, modelName: "Users", paranoid: true, timestamps: true });

module.exports = { Users };
