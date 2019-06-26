"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("coupon_lists", {
      coupon_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      coupon_code: {
        // (p(3) + c(2) + y(2) + s(3) + 8)
        type: Sequelize.BIGINT,
        allowNull: false
      },
      expiry_date: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expiry_time: {
        type: Sequelize.STRING,
        allowNull: false
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
    return queryInterface.dropTable("coupon_lists");
  }
};
