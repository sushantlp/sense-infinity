'use strict';
module.exports = (sequelize, DataTypes) => {
	var customerInformationTrack = sequelize.define(
		'customer_information_track',
		{
			first_name: DataTypes.STRING,
			last_name: DataTypes.STRING,
			email: DataTypes.STRING,
			mobile: DataTypes.STRING,
			dob: DataTypes.STRING,
			gender_id: DataTypes.INTEGER,
			city_id: DataTypes.INTEGER,
			locality_id: DataTypes.INTEGER,
			merchant_id: DataTypes.INTEGER,
			store_id: DataTypes.INTEGER,
			married: DataTypes.BOOLEAN,
			address_one: DataTypes.STRING,
			address_two: DataTypes.STRING,
			landmark: DataTypes.STRING,
			spouse_name: DataTypes.STRING,
			anniversary_date: DataTypes.STRING,
			gateway: DataTypes.STRING,
			status: DataTypes.BOOLEAN
		},
		{}
	);
	customerInformationTrack.associate = function(models) {
		// associations can be defined here
	};
	return customerInformationTrack;
};
