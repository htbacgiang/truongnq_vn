'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        email: 'truongt27.ht@gmail.com',
        password: '123456',
        firstName: 'Ngô',
        lastName: 'Quang Trường',
        address: 'Hà Tây',
        gender: 1 ,
        image: null,
        phonenumber: '0979842701',
        roleId: 'ROLE',
        positionId: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
