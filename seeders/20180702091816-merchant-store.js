'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'merchant_stores',
      [
        {
          merchant_id: 1,
          store_name: 'JP Nagar',
          address_one: 'JP Nagar',
          status: 1,
          city_id: 1,
          locality_id: 4,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          merchant_id: 1,
          store_name: 'Jayanagar',
          address_one: 'Jayanagar',
          status: 1,
          city_id: 1,
          locality_id: 3,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('merchant_stores', null, {});
  }
};
