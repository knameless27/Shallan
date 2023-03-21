"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Roles", [
      {
        name: "admin",
        state: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "librarian",
        state: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "reader",
        state: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {});
  },
};
