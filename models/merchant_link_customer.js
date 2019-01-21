'use strict';
module.exports = (sequelize, DataTypes) => {
	var merchantLinkCustomer = sequelize.define(
		'merchant_link_customer',
		{
			merchant_id: DataTypes.INTEGER,
			store_id: DataTypes.INTEGER,
			customer_information_id: DataTypes.INTEGER,
			status: DataTypes.BOOLEAN
		},
		{}
	);
	merchantLinkCustomer.associate = function(models) {
		// associations can be defined here
	};
	return merchantLinkCustomer;
};
