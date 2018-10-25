"use strict";

// Validate Merchant SignUp
module.exports.validateSignUpRequest = (req, res) => {
  req.assert("mobile", "mobile can be 10 characters long").len(10);

  const errors = req.validationErrors();

  if (errors) {
    return errors;
  }

  return 1;
};
