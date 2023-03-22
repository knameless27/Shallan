"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        name: "juan",
        email: "juan@perez.com",
        password: '1234',
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 1,
      },
      {
        name: "felipe",
        email: "felipe@cardozo.com",
        password: '1234',
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
      },
      {
        name: "anaiz",
        email: "anaiz@lopez.com",
        password: '1234',
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
