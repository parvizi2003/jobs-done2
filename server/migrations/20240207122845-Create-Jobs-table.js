'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Jobs', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      date: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      time: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('Jobs');
  }
};
