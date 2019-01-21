'use strict';
module.exports = (sequelize, DataTypes) => {
	var customerInformationData = sequelize.define(
		'customer_information_data',
		{
			first_name: DataTypes.STRING,
			last_name: DataTypes.STRING,
			email: DataTypes.STRING,
			mobile: DataTypes.STRING,
			dob: DataTypes.STRING,
			gender_id: DataTypes.INTEGER,
			city_id: DataTypes.INTEGER,
			locality_id: DataTypes.INTEGER,
			married: DataTypes.INTEGER,
			address_one: DataTypes.STRING,
			address_two: DataTypes.STRING,
			landmark: DataTypes.STRING,
			spouse_name: DataTypes.STRING,
			anniversary_date: DataTypes.STRING,
			status: DataTypes.BOOLEAN
		},
		{}
	);
	customerInformationData.associate = function(models) {
		// associations can be defined here
	};
	return customerInformationData;
};
