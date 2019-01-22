'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('merchant_link_customers', {
      merchant_link_customer_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      merchant_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        references: { model: 'merchants', key: 'merchant_id' }
      },
      store_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        references: { model: 'merchant_stores', key: 'store_id' }
      },
      customer_information_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        references: { model: 'customer_information_data', key: 'customer_information_id' }
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('merchant_link_customers');
  }
};
