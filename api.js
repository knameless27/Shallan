const { Router } = require('express')
const router = Router()
const UsersController = require('./controllers/UsersController');
const BooksController = require('./controllers/BooksController');
const CategoriesController = require('./controllers/CategoriesController');

router.all('/categories', CategoriesController.all)
router.all('/categories/:id', CategoriesController.all)
router.all("/books", BooksController.index);
router.get("/xd", UsersController.findUsers);

module.exports = router
