'use strict';

const moment = require('moment-timezone');

// Import Config
const constants = require('../config/constants');

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

// Current Date and Time
const now = moment()
	.tz('Asia/Kolkata')
	.format('YYYY-MM-DD HH-m-ss');

/**
 * Start Database Read and Write
 */

// Keep Information Track
module.exports.keepInformationTrack = async (
	firstName,
	lastName,
	email,
	mobile,
	dob,
	genderId,
	cityId,
	localityId,
	merchantId,
	storeId,
	married,
	addressOne,
	addressTwo,
	landmark,
	spouseName,
	anniversaryDate,
	gateway,
	status
) => {
	try {
		// Create Mysql Connection
		const connection = await constants.createMysqlConnection();

		if (addressOne === undefined) {
			addressOne = connection.escape(addressOne);
		}

		if (addressTwo === undefined) {
			addressTwo = connection.escape(addressTwo);
		}

		if (landmark === undefined) {
			landmark = connection.escape(landmark);
		}

		if (spouseName === undefined) {
			spouseName = connection.escape(spouseName);
		}

		if (anniversaryDate === undefined) {
			anniversaryDate = connection.escape(anniversaryDate);
		}

		// Query
		const query =
			'INSERT INTO `customer_information_tracks` (`first_name`,`last_name`,`email`,`mobile`,`dob`,`gender_id`,`city_id`,`locality_id`,`merchant_id`,`store_id`,`married`,`address_one`,`address_two`,`landmark`,`spouse_name`,`anniversary_date`,`gateway`,`status`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

		// Query Database
		const row = await connection.execute(query, [
			firstName,
			lastName,
			email,
			mobile,
			dob,
			genderId,
			cityId,
			localityId,
			merchantId,
			storeId,
			married,
			addressOne,
			addressTwo,
			landmark,
			spouseName,
			anniversaryDate,
			gateway,
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

/**
 * End Database Read and Write
 */
