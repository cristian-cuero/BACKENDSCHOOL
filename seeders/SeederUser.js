const sequelize = require('../database/config')()
const queryInterface = sequelize.getQueryInterface();
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username: 'ADMIN',
      name: 'ADMIN',
      lastName: 'ADMIN',
      email: 'example@example.com',
      password: '12345678',
      state: true,
      rol: 'root',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Tenats', null, {});
  }
};
