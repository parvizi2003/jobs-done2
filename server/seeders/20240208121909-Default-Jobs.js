'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('Jobs', [
      {
        user_id: 1,
        name: 'admin-job-3',
        date: '2024-01-03',
        time: 30
      },
      {
        user_id: 1,
        name: 'admin-job-1',
        date: '2024-01-01',
        time: 10
      },
      {
        user_id: 1,
        name: 'admin-job-4',
        date: '2024-01-04',
        time: 40
      },
      {
        user_id: 1,
        name: 'admin-job-2',
        date: '2024-01-02',
        time: 20
      },
      {
        user_id: 2,
        name: 'user-job-3',
        date: '2024-01-07',
        time: 70
      },
      {
        user_id: 2,
        name: 'user-job-1',
        date: '2024-01-05',
        time: 50
      },
      {
        user_id: 2,
        name: 'user-job-4',
        date: '2024-01-08',
        time: 80
      },
      {
        user_id: 2,
        name: 'user-job-2',
        date: '2024-01-06',
        time: 60
      },
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Jobs', null);
  }
};
