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
      }, {
        first_name: "Ajay",
        last_name: "Pandey",
        business_name: "Walmart",
        email: "ajaypandey8@gmail.com",
        mobile: "9845111980",
        category_id: 1000,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        first_name: "Amit",
        last_name: "Patel",
        business_name: "D-Mart",
        email: "amitvek007@gmail.com",
        mobile: "9033408739",
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