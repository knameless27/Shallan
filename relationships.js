const { Books } = require("./models/BooksModel");
const { Categories } = require("./models/CategoriesModel");
const { Users } = require("./models/UsersModel");

function init() {
    Categories.belongsTo(Books);
    Books.hasOne(Categories);
    Books.belongsTo(Users);
    Users.hasMany(Books);
}

module.exports = {init};
