"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Categories", [
      {
        name: "Adventure stories",
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Classics",
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Crime",
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fairy tales",
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "fables",
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "folk tales",
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fantasy",
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Historical fiction",
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Horror",
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Humour and satire",
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Literary fiction",
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mystery",
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
