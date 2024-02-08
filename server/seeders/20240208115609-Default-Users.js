'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    queryInterface.bulkInsert('Users', [
      {
        name: 'admin',
        password: 'admin2023'
      },
      {
        name: 'user',
        password: 'user2023'
      }
  ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Users', null);
  }
};
