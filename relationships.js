const sequelize = require("./db")
const { Books } = require("./models/BooksModel");
const { Categories } = require("./models/CategoriesModel");
const { Roles } = require("./models/RolModel");
const { Users } = require("./models/UsersModel");

function init() {
  const User_Books = sequelize.define('User_Books', {},{paranoid: true, timestamps: true});
  Categories.hasMany(Books);
  Books.belongsTo(Categories);
  Roles.hasMany(Users);
  Users.belongsTo(Roles);
  Books.belongsToMany(Users, { through: User_Books });
  Users.belongsToMany(Books, { through: User_Books });
}

module.exports = { init };