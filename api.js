const { Router } = require('express')
const router = Router()
const UsersController = require('./controllers/UsersController');
const BooksController = require('./controllers/BooksController');
const CategoriesController = require('./controllers/CategoriesController');
const RolesController = require('./controllers/RolesController');

router.all('/categories', CategoriesController.all);
router.all('/categories/:id', CategoriesController.all);
router.all('/roles', RolesController.all);
router.all('/roles/:id', RolesController.all);
router.all("/books", BooksController.all);
router.all("/books/:id", BooksController.all);
router.all("/users", UsersController.all);
router.all("/users/:id", UsersController.all);

module.exports = router
