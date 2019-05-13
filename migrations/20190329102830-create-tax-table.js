'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tax_tables', {
      tax_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hsn: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      sgst: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      cgst: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      igst: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tax_tables');
  }
};