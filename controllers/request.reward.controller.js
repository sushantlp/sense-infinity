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
        req.body.mobile,
        req.body.country_code
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
    req.body.country_code !== "" &&
    req.body.password !== undefined &&
    req.body.password !== ""
  ) {

    // Logic Register Email
    return logicRewardController
    .logicRegisterEmail(
        req.body.email,
        req.body.mobile,
        req.body.country_code,
        req.body.password,
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