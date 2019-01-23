'use strict';

const moment = require('moment-timezone');

// Import Config
const constants = require('../config/constants');

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

// Current Date and Time
const now = moment()
	.tz('Asia/Kolkata')
	.format('YYYY-MM-DD HH-m-ss');

/**
 * Start Database Read and Write
 */

// Keep Merchant Link Customer
module.exports.keepMerchantLinkCustomer = async (merchantId, storeId, customerInformationId, status) => {
	try {
		// Create Mysql Connection
		const connection = await constants.createMysqlConnection();

		// Query
		const query =
			'INSERT INTO `merchant_link_customers` (`merchant_id`,`store_id`,`customer_information_id`,`status`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?)';

		// Query Database
		const row = await connection.execute(query, [merchantId, storeId, customerInformationId, status, now, now]);

		connection.close();

		return row;
	} catch (error) {
		return Promise.reject(error);
	}
};

// Read Merchant Link Customer
module.exports.readMerchantLinkCustomer = async (select, merchantId, storeId, customerInformationId, status) => {
	try {
		// Create Mysql Connection
		const connection = await constants.createMysqlConnection();

		// Query
		const query = `SELECT ${select} FROM merchant_link_customers WHERE merchant_id = ? AND store_id = ? AND customer_information_id = ? AND status = ? LIMIT 1`;

		// Query Database
		const [rows, fields] = await connection.execute(query, [merchantId, storeId, customerInformationId, status]);

		connection.close();

		return rows;
	} catch (error) {
		return Promise.reject(error);
	}
};

/**
 * End Database Read and Write
 */
