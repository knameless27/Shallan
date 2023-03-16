const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

class Books extends Model {}
Books.init({
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
}, { sequelize, modelName: "Books", paranoid: true, timestamps: true });

module.exports = {Books};
