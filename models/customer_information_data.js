'use strict';

const moment = require('moment-timezone');

// Import Config
const constants = require('./config/constants');

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

// Keep Device Detail
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
		const connection = await mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USERNAME,
			port: process.env.DB_PORT,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE
		});

		// Query
		const query =
			'INSERT INTO `device_details` (`mobile`,`store_id`,`longitude`,`latitude`,`brand`,`device`,`model`,`app_id`,`version_sdk`,`version_release`,`sense_version_number`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';

		// Query Database
		const row = await connection.execute(query, [
			mobile,
			storeId,
			longitude,
			latitude,
			brand,
			device,
			model,
			appId,
			versionSdk,
			versionRelease,
			senseVersionNumber,
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
