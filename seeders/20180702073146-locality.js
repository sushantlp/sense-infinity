"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "localities", [{
        city_id: 1,
        locality_name: "Whitefield",
        pincode: 560066,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        city_id: 1,
        locality_name: "Indiranagar",
        pincode: 560038,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        city_id: 1,
        locality_name: "Jayanagar",
        pincode: 560041,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        city_id: 1,
        locality_name: "JP Nagar",
        pincode: 560078,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        city_id: 1,
        locality_name: "BTM Layout",
        pincode: 560076,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        city_id: 2,
        locality_name: "Hauz Khas",
        pincode: 110016,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        city_id: 2,
        locality_name: "Dwarka",
        pincode: 110075,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        city_id: 3,
        locality_name: "Yamuna Exp",
        pincode: 203201,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        city_id: 3,
        locality_name: "Noida Extension",
        pincode: 201305,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        city_id: 4,
        locality_name: "Vasco da Gama",
        pincode: 403802,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        city_id: 4,
        locality_name: "Colva",
        pincode: 403708,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        city_id: 5,
        locality_name: "Sector 1",
        pincode: 160001,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        city_id: 5,
        locality_name: "Sector 10",
        pincode: 160011,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        city_id: 6,
        locality_name: "Ashok Nagar",
        pincode: 600033,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        city_id: 6,
        locality_name: "Anna Nagar",
        pincode: 600101,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("localities", null, {});
  }
};