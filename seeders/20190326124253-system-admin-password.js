'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "system_administrator_passwords", [{
        warehouse_role_id: 1,
        password: "EuQpqtks6oqlts5yXEulTEJV1Mt1jX7E72iKHOlvek6dGN5C7mfrgq5VYUoUl7DAkQaLHpJ5rSTMBhtFrinjuw==",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("system_administrator_passwords", null, {});
  }
};