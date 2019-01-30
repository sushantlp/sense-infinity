"use strict";

// Import Controller
const logicRewardController = require("./logic.reward.controller");

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
          mobile: req.body.mobile,
          card: req.body.card,
          mobile_code: req.body.country_code
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