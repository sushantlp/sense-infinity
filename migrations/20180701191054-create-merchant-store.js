'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('merchant_stores', {
      store_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      merchant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'merchants',
          key: 'merchant_id'
        }
      },
      store_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      address_one: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      address_two: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      landmark: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      city_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        references: {
          model: 'cities',
          key: 'city_id'
        }
      },
      locality_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        references: {
          model: 'localities',
          key: 'locality_id'
        }
      },
      pincode: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      longitude: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue: 0
      },
      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue: 0
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      sense: {
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
    return queryInterface.dropTable('merchant_stores');
  }
};