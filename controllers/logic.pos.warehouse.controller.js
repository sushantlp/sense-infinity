"use strict";


// Logic Get Warehouse Static Data
module.exports.logicWarehouseStaticData = async(version, apiKey) => {
  try {


    return {
      success: true,
      data: {},
      msg: "Empty sense constant"
    };

    // // Read Sense Constant Record
    // const senseConstant = await senseConstModel.readSenseConstant(
    //   "*",
    //   "STATIC_APP_VERSION",
    //   1
    // );

    // // Zero Means Empty Record
    // if (senseConstant.length === 0) return {
    //   success: false,
    //   data: {},
    //   msg: "Empty sense constant"
    // };

    // // Check Sense Static App Version
    // if (appVersion === parseFloat(senseConstant[0].value)) return {
    //   success: true,
    //   data: {},
    //   msg: "Upto date"
    // };
    // else appVersion = parseFloat(senseConstant[0].value);

    // // Parallel City Locality Gender Record
    // const parallel = await Promise.all([
    //   cityModel.readCityRecord(
    //     "city_id AS city_unique, city_name AS city, longitude AS lon, latitude AS lat",
    //     1
    //   ),
    //   localityModel.readLocalityRecord(
    //     "locality_id AS locality_unique, city_id AS city_unique, locality_name AS locality, pincode, longitude AS lon, latitude AS lat",
    //     1
    //   ),
    //   genderModel.readGenderRecord(
    //     "gender_id AS gender_unique, name AS gender_name",
    //     1
    //   )
    // ]);

    // if (parallel.length === 0) return Promise.reject("Oops our bad!!!");

    // return {
    //   success: true,
    //   data: {
    //     city: parallel[0],
    //     locality: parallel[1],
    //     gender: parallel[2]
    //   },
    //   msg: "Succesful",
    //   version: appVersion
    // };
  } catch (error) {
    return Promise.reject(error);
  }
};