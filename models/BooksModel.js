const seq = require("../db");
const { DataTypes } = require("sequelize");

const Books = seq.define("Books", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pages: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  publication_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
},{ paranoid: true, timestamps: true });

module.exports = {Books};
