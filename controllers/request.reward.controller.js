"use strict";

// Import Controller
const logicRewardController = require("./logic.reward.controller");
const shareController = require("./share.controller");

// Request Verify Membership Card and Mobile
module.exports.requestVerifyMemberMobile = (req, res) => {
  if (
    req.body.card !== undefined &&
    req.body.card !== "" &&
    req.body.mobile !== undefined &&
    req.body.mobile !== "" &&
    req.body.country_code !== undefined &&
    req.body.country_code !== ""
  ) {
    // Logic Verify Memebership Card and Mobile
    return logicRewardController
      .logicVerifyMemberMobile(
        req.body.card,
        req.body.mobile.toString(),
        req.body.country_code.toString()
      )
      .then(response => {
        // Intialize
        const metadata = {
          type: req.body.mobile,
        };

        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              "/api/v1/rewards/verify/membership/mobile",
              200,
              response.success,
              metadata
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else {
    return res.status(400).send("Not a good api call");
  }
};


// Request Register Email
module.exports.requestRegisterEmail = (req, res) => {
  if (
    req.body.email !== undefined &&
    req.body.email !== "" &&
    req.body.mobile !== undefined &&
    req.body.mobile !== "" &&
    req.body.country_code !== undefined &&
    req.body.country_code !== ""
  ) {

    // Logic Register Email
    return logicRewardController
      .logicRegisterEmail(
        req.body.email,
        req.body.mobile.toString(),
        req.body.country_code.toString(),
      )
      .then(response => {
        // Intialize
        const metadata = {
          type: req.body.email,
        };

        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              "/api/v1/rewards/register/email",
              200,
              response.success,
              metadata
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else {
    return res.status(400).send("Not a good api call");
  }
}

// Request Verify Otp
module.exports.requestVerifyOtp = (req, res) => {
  if (
    req.body.password !== undefined &&
    req.body.password !== "" &&
    req.body.mobile !== undefined &&
    req.body.mobile !== "" &&
    req.body.country_code !== undefined &&
    req.body.country_code !== "" &&
    req.body.otp !== undefined &&
    req.body.otp !== ""
  ) {

    // Logic Verify Otp
    return logicRewardController
      .logicVerifyOtp(
        req.body.password,
        req.body.mobile.toString(),
        req.body.country_code.toString(),
        req.body.otp,
      )
      .then(response => {

        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              "/api/v1/rewards/verify/otp",
              200,
              response.success, {}
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else {
    return res.status(400).send("Not a good api call");
  }
}

// Request Keep Customer Data
module.exports.requestKeepCustomerData = (req, res) => {
  if (
    req.body.email !== undefined &&
    req.body.email !== "" &&
    req.body.mobile !== undefined &&
    req.body.mobile !== "" &&
    req.body.country_code !== undefined &&
    req.body.country_code !== "" &&
    req.body.card !== undefined &&
    req.body.card !== "" &&
    req.body.city !== undefined &&
    req.body.city !== "" &&
    req.body.locality !== undefined &&
    req.body.locality !== "" &&
    req.body.hasOwnProperty('first_name') &&
    req.body.hasOwnProperty('last_name') &&
    req.body.hasOwnProperty('dob') &&
    req.body.hasOwnProperty('gender') &&
    req.body.hasOwnProperty('married') &&
    req.body.hasOwnProperty('spouse') &&
    req.body.hasOwnProperty('anniversary') &&
    req.body.hasOwnProperty('address_one') &&
    req.body.hasOwnProperty('address_two') &&
    req.body.hasOwnProperty('landmark')
  ) {

    // Logic Keep Customer Data
    return logicRewardController
      .logicKeepCustomerData(
        req.body.email,
        req.body.mobile.toString(),
        req.body.country_code.toString(),
        req.body.card,
        req.body.first_name,
        req.body.last_name,
        req.body.dob,
        req.body.gender,
        req.body.married,
        req.body.spouse,
        req.body.anniversary,
        req.body.address_one,
        req.body.address_two,
        req.body.landmark,
        req.body.city,
        req.body.locality,
      )
      .then(response => {

        // Intialize
        const metadata = {
          type: req.body.email,
        };

        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              "/api/v1/rewards/customer/data",
              200,
              response.success, metadata
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else {
    return res.status(400).send("Not a good api call");
  }
}

// Request Get All Coupon Customer Reward 
module.exports.requestGetAllData = (req, res) => {
  if (
    req.query.mobile !== undefined &&
    req.query.mobile !== "" &&
    req.query.country_code !== undefined &&
    req.query.country_code !== ""
  ) {

    // Logic Get All Coupon Customer Reward 
    return logicRewardController
      .logicGetAllData(
        req.query.mobile.toString(),
        req.query.country_code.toString()
      )
      .then(response => {

        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.data,
              response.msg,
              "/api/v1/rewards/all/data",
              200,
              response.success, {}
            )
          );
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send("Oops our bad!!!");
      });
  } else {
    return res.status(400).send("Not a good api call");
  }
}