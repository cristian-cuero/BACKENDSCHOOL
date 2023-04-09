const sequelize = require('../database/config')()
const queryInterface = sequelize.getQueryInterface();
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, sequelize) {
    return queryInterface.bulkInsert('Tenats', [{
      nit: '1234567',
      businessName: 'Pay School',
      address: 'calle 1',
      responsibleId: '420',
      responsibleName: 'ADMIN',
      responsibleLastName: 'ADMIN',
      responsiblePhone: 'P121212',
      subdomain: 'localhost.com',
      email: 'example@example.com',
      schema: 'public',
      state: true,
      picture: '',
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
