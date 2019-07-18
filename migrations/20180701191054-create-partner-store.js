'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('partner_stores', {
      store_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      store_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      partner_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'partners',
          key: 'partner_id'
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
      gstin_no: {
        type: Sequelize.STRING,
        allowNull: true
      },
      store_mobile: {
        type: Sequelize.STRING,
        allowNull: true
      },
      store_email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      refund_on_discount: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
      },
      refund_policy: {
        type: Sequelize.TEXT('long'),
        allowNull: true
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
    return queryInterface.dropTable('partner_stores');
  }
};