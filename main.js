require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const api = require("./api");
const app = express();
const session = require("express-session")
const { init } = require("./relationships");
//settings
app.set("name", "Shallan");
app.set("port", process.env.PORT);
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true
}))
init();
//middlewares
app.use(morgan("dev"));
app.use(express.json());
//routes
app.use(api);

app.listen(app.get("port"));
