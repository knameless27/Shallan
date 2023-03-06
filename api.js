const { Router } = require('express')
const router = Router()
const books = require('./controllers/books');

router.get("/", books.index);

module.exports = router