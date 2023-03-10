require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const api = require("./api");
const app = express();
// planet scale
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)
connection.end()
//settings
app.set("name", "Shallan");
app.set("port", process.env.PORT);
//middlewares
app.use(morgan("dev"));
app.use(express.json());
//routes
app.use(api);

app.listen(app.get("port"));
