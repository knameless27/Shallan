const seq = require("../db");
const { DataTypes } = require("sequelize");

const Users = seq.define("Users", {
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
},{ paranoid: true, timestamps: true });

module.exports = { Users };
