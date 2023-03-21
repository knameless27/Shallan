const { DataTypes } = require("sequelize");
const sequelize = require("./db")
const { Books } = require("./models/BooksModel");
const { Categories } = require("./models/CategoriesModel");
const { Roles } = require("./models/RolModel");
const { Users } = require("./models/UsersModel");

const User_Books = sequelize.define('User_Books', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
},{paranoid: true, timestamps: true});
function init() {
  Categories.hasMany(Books);
  Books.belongsTo(Categories);
  Roles.hasMany(Users);
  Users.belongsTo(Roles);
  Books.belongsToMany(Users, { through: User_Books });
  Users.belongsToMany(Books, { through: User_Books });
}

module.exports = {
    init,
    User_Books
 };
