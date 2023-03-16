const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "shallan",
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    dialectOptions: {},
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);


sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Tables and relations created successfully!");
  })
  .catch((error) => {
    console.error("Error occurred while creating tables and relations:", error);
  });

module.exports = sequelize;
