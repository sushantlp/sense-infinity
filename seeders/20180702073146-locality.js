"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "localities",
      [
        {
          city_id: 1,
          locality_name: "Whitefield",
          pincode: "560066",
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          city_id: 1,
          locality_name: "Indiranagar",
          pincode: "560038",
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          city_id: 1,
          locality_name: "Jayanagar",
          pincode: "560041",
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          city_id: 1,
          locality_name: "JP Nagar",
          pincode: "560078",
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          city_id: 1,
          locality_name: "BTM Layout",
          pincode: "560076",
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("localities", null, {});
  }
};
