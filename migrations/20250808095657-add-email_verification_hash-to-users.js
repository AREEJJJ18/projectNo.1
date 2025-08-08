'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.addColumn('Users', 'email_verification_hash',{
        type : Sequelize.STRING,
        allowNull: true
      });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'email_verification_hash')
  }
};
