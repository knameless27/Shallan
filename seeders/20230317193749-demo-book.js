"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Books", [
      {
        name: "the blue whale",
        image: "http://c.files.bbci.co.uk/653B/production/_95151952_mediaitem95151800.jpg",
        author: "juan castro",
        pages: 234,
        publication_date: new Date(),
        stock: 12,
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1,
      },
      {
        name: "1984",
        image: "https://cdn.culturagenial.com/es/imagenes/novela-1984-de-george-orwell-og.jpg",
        author: "george orwell",
        pages: 531,
        publication_date: new Date(),
        stock: 3,
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 2,
      },
      {
        name: "The devil in the white city",
        image: "https://the-bibliofile.com/wp-content/uploads/devilinthewhitecity2.png",
        author: "erik larson",
        pages: 621,
        publication_date: new Date(),
        stock: 6,
        state: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Books', null, {});
  },
};
