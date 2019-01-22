'use strict';

const moment = require('moment-timezone');

// Import Config
const constants = require('../config/constants');

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
			married: DataTypes.BOOLEAN,
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

// Current Date and Time
const now = moment()
	.tz('Asia/Kolkata')
	.format('YYYY-MM-DD HH-m-ss');

/**
 * Start Database Read and Write
 */

// Read Customer Information Data By Customer Information Id
module.exports.readCustomerDataId = async (select, id, status) => {
	try {
		// Create Mysql Connection
		const connection = await constants.createMysqlConnection();

		// Query
		const query = `SELECT ${select} FROM customer_information_data WHERE customer_information_id = ? AND status = ? LIMIT 1`;

		// Query Database
		const [rows, fields] = await connection.execute(query, [mobile, status]);

		connection.close();

		return rows;
	} catch (error) {
		return Promise.reject(error);
	}
};

// Read Customer Information Data By Mobile
module.exports.readCustomerDataMobile = async (select, mobile, status) => {
	try {
		// Create Mysql Connection
		const connection = await constants.createMysqlConnection();

		// Query
		const query = `SELECT ${select} FROM customer_information_data WHERE mobile = ? AND status = ? LIMIT 1`;

		// Query Database
		const [rows, fields] = await connection.execute(query, [mobile, status]);

		connection.close();

		return rows;
	} catch (error) {
		return Promise.reject(error);
	}
};

// Keep Customer Information Data
module.exports.keepCustomerData = async (
	firstName,
	lastName,
	email,
	mobile,
	dob,
	genderId,
	cityId,
	localityId,
	married,
	addressOne,
	addressTwo,
	landmark,
	spouseName,
	anniversaryDate,
	status
) => {
	try {
		// Create Mysql Connection
		const connection = await constants.createMysqlConnection();

		// Query
		const query =
			'INSERT INTO `customer_information_data` (`first_name`,`last_name`,`email`,`mobile`,`dob`,`gender_id`,`city_id`,`locality_id`,`married`,`address_one`,`address_two`,`landmark`,`spouse_name`,`anniversary_date`,`status`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

		// Query Database
		const row = await connection.execute(query, [
			connection.escape(firstName),
			connection.escape(lastName),
			connection.escape(email),
			mobile,
			connection.escape(dob),
			genderId,
			cityId,
			localityId,
			married,
			connection.escape(addressOne),
			connection.escape(addressTwo),
			connection.escape(landmark),
			connection.escape(spouseName),
			connection.escape(anniversaryDate),
			status,
			now,
			now
		]);

		connection.close();

		return row;
	} catch (error) {
		return Promise.reject(error);
	}
};

// Update Customer Information Data
module.exports.updateCustomerData = async (
	firstName,
	lastName,
	email,
	mobile,
	dob,
	genderId,
	cityId,
	localityId,
	married,
	addressOne,
	addressTwo,
	landmark,
	spouseName,
	anniversaryDate
) => {
	try {
		// Create Mysql Connection
		const connection = await constants.createMysqlConnection();

		// Query
		const query =
			'UPDATE `customer_information_data` SET `first_name` = ?, `last_name` = ?, `email` = ?,  `dob` = ?, `gender_id` = ?, `city_id` = ?, `locality_id` = ?, `married` = ?, `address_one` = ?, `address_two` = ?, `landmark` = ?, `spouse_name` = ?, `anniversary_date` = ?, `updated_at` = ? WHERE `mobile` = ?';

		// Query Database
		const row = await connection.execute(query, [
			connection.escape(firstName),
			connection.escape(lastName),
			connection.escape(email),
			connection.escape(dob),
			genderId,
			cityId,
			localityId,
			married,
			connection.escape(addressOne),
			connection.escape(addressTwo),
			connection.escape(landmark),
			connection.escape(spouseName),
			connection.escape(anniversaryDate),
			now,
			mobile
		]);

		connection.close();

		return row;
	} catch (error) {
		return Promise.reject(error);
	}
};

/**
 * End Database Read and Write
 */
