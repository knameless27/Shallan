const seq = require("../db");
const { DataTypes } = require("sequelize");

const Libro = seq.define("Libro", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo_libro_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  autor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  autor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Libro;
