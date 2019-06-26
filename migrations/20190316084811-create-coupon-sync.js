"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("coupon_syncs", {
      coupon_sync_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      partner_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "partners",
          key: "partner_id"
        }
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "partner_stores",
          key: "store_id"
        }
      },
      coupon_start_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      coupon_end_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      sync_status: {
        // 1 means done and 0 means pending
        type: Sequelize.BOOLEAN,
        defaultValue: 0
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
    return queryInterface.dropTable("coupon_syncs");
  }
};
