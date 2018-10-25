"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Sushant Singh Chauhan",
          password: bcrypt.hashSync("7898130226", 10),
          email: "sushantsingh.1081@gmail.com",
          mobile: "7898130226",
          status: 1,
          role_id: 1,
          email_active: 1,
          mobile_active: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
