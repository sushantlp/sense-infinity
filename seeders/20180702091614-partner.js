"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "partners", [{
        first_name: "Sushant",
        last_name: "Singh Chauhan",
        business_name: "AM Retail",
        email: "sushantsingh.1081@gmail.com",
        mobile: "7898130226",
        category_id: 1000,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("partners", null, {});
  }
};