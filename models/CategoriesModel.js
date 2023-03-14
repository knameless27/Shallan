const seq = require("../db");
const { DataTypes } = require("sequelize");

const Categories = seq.define("Categories", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
},{ paranoid: true, timestamps: true });

module.exports = { Categories };
