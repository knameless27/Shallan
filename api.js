const { Router } = require('express')
const router = Router()
const UsersController = require('./controllers/UsersController');
const BooksController = require('./controllers/BooksController');
const CategoriesController = require('./controllers/CategoriesController');
const RolesController = require('./controllers/RolesController');
const { login } = require("./auth");

async function verifyUser(req, res, next) {
    try {
        if (req.session.user != undefined) {
            next()
        }
    } catch (error) {
        res.send({
            error: error
        })
    }
}
router.post('/login', login)
router.all('/categories', verifyUser, CategoriesController.all);
router.get('/categories/:id', CategoriesController.all);
router.all('/roles', RolesController.all);
router.get('/roles/:id', RolesController.all);
router.all("/books", BooksController.all);
router.get("/books/:id", BooksController.all);
router.post("/books/save", BooksController.saveBook);
router.get("/books/remove_reservation/:id", BooksController.removeReservation);
router.all("/users", UsersController.all);
router.get("/users/:id", UsersController.all);

module.exports = router
