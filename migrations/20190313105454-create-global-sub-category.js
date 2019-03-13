'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('global_sub_categories', {
      global_sub_category_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      global_sub_category_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      global_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'global_categories',
          key: 'global_category_id'
        }
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
    return queryInterface.dropTable('global_sub_categories');
  }
};