const { Router } = require('express')
const router = Router()
const UsersController = require('./controllers/UsersController');
const BooksController = require('./controllers/BooksController');

router.all("/books", BooksController.index);
router.get("/xd", UsersController.findUsers);

module.exports = router
