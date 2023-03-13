const seq = require("../db");
const { DataTypes } = require("sequelize");

const Users = seq.define("Usuario", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { Users };
