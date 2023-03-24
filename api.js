const { Router } = require('express')
const router = Router()
const UsersController = require('./controllers/UsersController');
const BooksController = require('./controllers/BooksController');
const CategoriesController = require('./controllers/CategoriesController');
const RolesController = require('./controllers/RolesController');
const { login, verifyUser, verifyReader, verifyLibrarian } = require("./auth");

router.post('/login', login)
router.all('/categories', verifyUser, CategoriesController.all);
router.get('/categories/:id', verifyUser, CategoriesController.all);
router.all('/roles', verifyUser, verifyReader, verifyLibrarian, RolesController.all);
router.get('/roles/:id', verifyUser, verifyReader, verifyLibrarian, RolesController.all);
router.all("/books", verifyUser, BooksController.all);
router.get("/books/:id", verifyUser, BooksController.all);
router.post("/books/save", verifyUser, BooksController.saveBook);
router.get("/books/remove_reservation/:id", verifyUser, BooksController.removeReservation);
router.all("/users", verifyUser, verifyReader, verifyLibrarian, UsersController.all);
router.get("/users/:id", verifyUser, verifyReader, verifyLibrarian, UsersController.all);

module.exports = router
