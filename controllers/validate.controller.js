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


// Validate Customer Detail
module.exports.validateCustomerDetail = (loop, bool) => {
  // Variable
  let responsedata = {};

  for (let i = 0; i < loop.length; i++) {
    // Customer Mobile Parameter Validate
    if (!loop[i].hasOwnProperty('customer_mobile') || loop[i]['customer_mobile'] === '') {
      return (responsedata = {
        success: false,
        msg: 'Customer mobile number should not be empty or null'
      });
    }

    // Customer First Name Parameter Validate
    if (!loop[i].hasOwnProperty('first_name') || loop[i]['first_name'] === '') {
      return (responsedata = {
        success: false,
        msg: 'Customer first name should be valid'
      });
    }

    // Customer Last Name Parameter Validate
    if (!loop[i].hasOwnProperty('last_name') || loop[i]['last_name'] === '') {
      return (responsedata = {
        success: false,
        msg: 'Customer last name should be valid'
      });
    }

    // Customer Dob Parameter Validate
    if (!loop[i].hasOwnProperty('dob') || loop[i]['dob'] === '') {
      return (responsedata = {
        success: false,
        msg: 'Customer dob should be valid'
      });
    }

    // Customer Email Parameter Validate
    if (!loop[i].hasOwnProperty('email') || loop[i]['email'] === '') {
      return (responsedata = {
        success: false,
        msg: 'Customer email should be valid'
      });
    }

    // Customer Gender Id Parameter Validate
    if (!loop[i].hasOwnProperty('gender_id') || loop[i]['gender_id'] === '') {
      return (responsedata = {
        success: false,
        msg: 'Gender should be valid'
      });
    }

    // Customer Gender Id Is Numeric
    if (
      // isNaN(loop[i]["gender_id"]) ||
      loop[i]['gender_id'] !== parseInt(loop[i]['gender_id'], 10)
    ) {
      return (responsedata = {
        success: false,
        msg: 'Gender should be numeric'
      });
    }

    // If True then Execute
    if (bool) {
      // Customer Married Parameter Validate
      if (!loop[i].hasOwnProperty('married')) {
        return (responsedata = {
          success: false,
          msg: 'Married parameter missing'
        });
      }

      // Married Numeric
      if (loop[i]['married'] !== parseInt(loop[i]['married'], 10)) {
        return (responsedata = {
          success: false,
          msg: 'Married should be numeric'
        });
      }

      // Customer Spouse Name Parameter Validate
      if (!loop[i].hasOwnProperty('spouse_name')) {
        return (responsedata = {
          success: false,
          msg: 'Spouse name parameter missing'
        });
      }

      // Customer Anniversary Parameter Validate
      if (!loop[i].hasOwnProperty('anniversary')) {
        return (responsedata = {
          success: false,
          msg: 'Anniversary parameter missing'
        });
      }

      // Customer Address One Parameter Validate
      if (!loop[i].hasOwnProperty('address_one')) {
        return (responsedata = {
          success: false,
          msg: 'Address one parameter missing'
        });
      }

      // Customer Address Two Parameter Validate
      if (!loop[i].hasOwnProperty('address_two')) {
        return (responsedata = {
          success: false,
          msg: 'Address two parameter missing'
        });
      }

      // Customer Landmark Parameter Validate
      if (!loop[i].hasOwnProperty('landmark')) {
        return (responsedata = {
          success: false,
          msg: 'Landmark parameter missing'
        });
      }

      // Customer City Parameter Validate
      if (!loop[i].hasOwnProperty('city_id') ||
        loop[i]['city_id'] === '' ||
        loop[i]['city_id'] === undefined ||
        loop[i]['city_id'] !== parseInt(loop[i]['city_id'], 10)
      ) {
        return (responsedata = {
          success: false,
          msg: 'City parameter missing'
        });
      }

      // Customer Locality Parameter Validate
      if (!loop[i].hasOwnProperty('locality_id') ||
        loop[i]['locality_id'] === '' ||
        loop[i]['locality_id'] === undefined ||
        loop[i]['locality_id'] !== parseInt(loop[i]['locality_id'], 10)
      ) {
        return (responsedata = {
          success: false,
          msg: 'Locality parameter missing'
        });
      }
    }
  }

  return (responsedata = {
    success: true,
    msg: 'Succesful'
  });
};

// Validate Reward Question Response
module.exports.validateRewardResponse = (json) => {
  // Variable
  let responsedata = {};

  for (let i = 0; i < json.length; i++) {

    const instanceArray = json[i].option instanceof Array;

    if (!json[i].hasOwnProperty('question_id')) {
      return (responsedata = {
        success: false,
        msg: 'Missing question id'
      });
    }

    if (!json[i].hasOwnProperty('option')) {
      return (responsedata = {
        success: false,
        msg: 'Missing option'
      });
    }

    if (!instanceArray) {
      return (responsedata = {
        success: false,
        msg: 'Option value should be array'
      });
    }

    if (json[i].option.length === 0) {
      return (responsedata = {
        success: false,
        msg: 'Option should not be empty'
      });
    }
  }

  if (json.length !== 0) {
    return (responsedata = {
      success: true,
      msg: 'Succesful'
    });
  } else {
    return (responsedata = {
      success: false,
      msg: 'Empty json'
    });
  }
}