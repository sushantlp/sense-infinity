"use strict";

// Validate Merchant SignUp
module.exports.validateSignUpRequest = (req, res) => {
  req.assert("mobile", "mobile can be 10 characters long").len(10);
  const errors = req.validationErrors();
  if (errors) return errors;
  return 1;
};


// Validate Survey Feedback
module.exports.validateSurveyFeedback = (json) => {
  try {

    for (let i = 0; i < json.length; i++) {

      // Survey
      if (json[i].customer_survey !== null) {
        for (let j = 0; j < json[i].customer_survey.length; j++) {
          if (!json[i].customer_survey[j].hasOwnProperty('question_id') || json[i].customer_survey[j]['question_id'] === '') return {
            success: false,
            msg: 'Survey question id should not be empty or null'
          };

          if (!json[i].customer_survey[j].hasOwnProperty('option_id') || json[i].customer_survey[j]['option_id'] === '') return {
            success: false,
            msg: 'Survey option id should not be empty or null'
          };

          if (!json[i].customer_survey[j].hasOwnProperty('role_id') || json[i].customer_survey[j]['role_id'] === '') return {
            success: false,
            msg: 'Survey role id should not be empty or null'
          };
        }
      }

      // Feedback
      if (json[i].customer_feedback !== null) {
        for (let j = 0; j < json[i].customer_feedback.length; j++) {
          if (!json[i].customer_feedback[j].hasOwnProperty('question_id') || json[i].customer_feedback[j]['question_id'] === '') return {
            success: false,
            msg: 'Feedback question id should not be empty or null'
          };

          if (!json[i].customer_feedback[j].hasOwnProperty('option_id') || json[i].customer_feedback[j]['option_id'] === '') return {
            success: false,
            msg: 'Feedback option id should not be empty or null'
          };

          if (!json[i].customer_feedback[j].hasOwnProperty('role_id') || json[i].customer_feedback[j]['role_id'] === '') return {
            success: false,
            msg: 'Feedback role id should not be empty or null'
          };
        }
      }
    }

    return {
      success: true,
      msg: 'Succesful'
    };

  } catch (error) {
    return {
      success: false,
      msg: 'Wrong json'
    };
  }
};

// Validate Customer Detail
module.exports.validateCustomerDetail = (loop, bool) => {
  try {

    for (let i = 0; i < loop.length; i++) {
      // Customer Mobile Parameter Validate
      if (!loop[i].hasOwnProperty('customer_mobile') || loop[i]['customer_mobile'] === '') return {
        success: false,
        msg: 'Customer mobile number should not be empty or null'
      };


      // Customer First Name Parameter Validate
      if (!loop[i].hasOwnProperty('first_name') || loop[i]['first_name'] === '') return {
        success: false,
        msg: 'Customer first name should be valid'
      };


      // Customer Last Name Parameter Validate
      if (!loop[i].hasOwnProperty('last_name') || loop[i]['last_name'] === '') return {
        success: false,
        msg: 'Customer last name should be valid'
      };


      // Customer Dob Parameter Validate
      if (!loop[i].hasOwnProperty('dob') || loop[i]['dob'] === '') return {
        success: false,
        msg: 'Customer dob should be valid'
      };


      // Customer Email Parameter Validate
      if (!loop[i].hasOwnProperty('email') || loop[i]['email'] === '') return {
        success: false,
        msg: 'Customer email should be valid'
      };


      // Customer Gender Id Parameter Validate
      if (!loop[i].hasOwnProperty('gender_id') || loop[i]['gender_id'] === '') return {
        success: false,
        msg: 'Gender should be valid'
      };


      // Customer Gender Id Is Numeric
      if (loop[i]['gender_id'] !== parseInt(loop[i]['gender_id'], 10)) return {
        success: false,
        msg: 'Gender should be numeric'
      };


      // If True then Execute
      if (bool) {
        // Customer Married Parameter Validate
        if (!loop[i].hasOwnProperty('married')) return {
          success: false,
          msg: 'Married parameter missing'
        };


        // Married Numeric
        if (loop[i]['married'] !== parseInt(loop[i]['married'], 10)) return {
          success: false,
          msg: 'Married should be numeric'
        };


        // Customer Spouse Name Parameter Validate
        if (!loop[i].hasOwnProperty('spouse_name')) return {
          success: false,
          msg: 'Spouse name parameter missing'
        };


        // Customer Anniversary Parameter Validate
        if (!loop[i].hasOwnProperty('anniversary')) return {
          success: false,
          msg: 'Anniversary parameter missing'
        };


        // Customer Address One Parameter Validate
        if (!loop[i].hasOwnProperty('address_one')) return {
          success: false,
          msg: 'Address one parameter missing'
        };


        // Customer Address Two Parameter Validate
        if (!loop[i].hasOwnProperty('address_two')) return {
          success: false,
          msg: 'Address two parameter missing'
        };


        // Customer Landmark Parameter Validate
        if (!loop[i].hasOwnProperty('landmark')) return {
          success: false,
          msg: 'Landmark parameter missing'
        };


        // Customer City Parameter Validate
        if (!loop[i].hasOwnProperty('city_id') ||
          loop[i]['city_id'] === '' ||
          loop[i]['city_id'] === undefined ||
          loop[i]['city_id'] !== parseInt(loop[i]['city_id'], 10)
        ) return {
          success: false,
          msg: 'City parameter missing'
        };


        // Customer Locality Parameter Validate
        if (!loop[i].hasOwnProperty('locality_id') ||
          loop[i]['locality_id'] === '' ||
          loop[i]['locality_id'] === undefined ||
          loop[i]['locality_id'] !== parseInt(loop[i]['locality_id'], 10)
        ) return {
          success: false,
          msg: 'Locality parameter missing'
        };

      }
    }

    return {
      success: true,
      msg: 'Succesful'
    };

  } catch (error) {
    return {
      success: false,
      msg: 'Wrong json'
    };
  }
};

// Validate Reward Question Response
module.exports.validateRewardResponse = (json) => {
  try {

    for (let i = 0; i < json.length; i++) {
      const instanceArray = json[i].option instanceof Array;

      if (!json[i].hasOwnProperty('question_id')) return {
        success: false,
        msg: 'Missing question id'
      };


      if (!json[i].hasOwnProperty('option')) return {
        success: false,
        msg: 'Missing option'
      };


      if (!instanceArray) return {
        success: false,
        msg: 'Option value should be array'
      };


      if (json[i].option.length === 0) return {
        success: false,
        msg: 'Option should not be empty'
      };

    }

    if (json.length !== 0) return {
      success: true,
      msg: 'Succesful'
    };
    else return {
      success: false,
      msg: 'Empty json'
    };

  } catch (error) {
    return {
      success: false,
      msg: 'Wrong json'
    };
  }
}

// Validate Warehouse Static Version
module.exports.warehouseStaticVersion = (version) => {
  try {

    if (!version.hasOwnProperty('city_version')) return {
      success: false,
      msg: 'Missing city version'
    };

    if (!version.hasOwnProperty('locality_version')) return {
      success: false,
      msg: 'Missing locality version'
    };

    if (!version.hasOwnProperty('discount_type_version')) return {
      success: false,
      msg: 'Missing discount type version'
    };

    if (!version.hasOwnProperty('discount_base_version')) return {
      success: false,
      msg: 'Missing discount base version'
    };

    if (!version.hasOwnProperty('gender_version')) return {
      success: false,
      msg: 'Missing locality version'
    };

    if (!version.hasOwnProperty('warehouse_role_version')) return {
      success: false,
      msg: 'Missing warehouse role version'
    };

    if (!version.hasOwnProperty('warehouse_payment_version')) return {
      success: false,
      msg: 'Missing gender version'
    };

    if (!version.hasOwnProperty('global_category_version')) return {
      success: false,
      msg: 'Missing category version'
    };

    if (!version.hasOwnProperty('global_sub_category_version')) return {
      success: false,
      msg: 'Missing sub category version'
    };

    if (!version.hasOwnProperty('global_sub_sub_category_version')) return {
      success: false,
      msg: 'Missing sub sub category version'
    };

    if (!version.hasOwnProperty('coupon_type_version')) return {
      success: false,
      msg: 'Missing coupon type version'
    };

    if (!version.hasOwnProperty('coupon_sub_type_version')) return {
      success: false,
      msg: 'Missing coupon sub type version'
    };

    if (!version.hasOwnProperty('item_condition_version')) return {
      success: false,
      msg: 'Missing item condition version'
    };

    if (!version.hasOwnProperty('order_status_version')) return {
      success: false,
      msg: 'Missing order status version'
    };

    if (!version.hasOwnProperty('product_unit_version')) return {
      success: false,
      msg: 'Missing product unit version'
    };

    if (!version.hasOwnProperty('product_sub_unit_version')) return {
      success: false,
      msg: 'Missing product sub unit version'
    };

    if (!version.hasOwnProperty('system_administrator_version')) return {
      success: false,
      msg: 'Missing system administrator version'
    };

    if (!version.hasOwnProperty('tax_version')) return {
      success: false,
      msg: 'Missing tax version'
    };

    return {
      success: true,
      msg: 'Succesful'
    };

  } catch (error) {
    return {
      success: false,
      msg: 'Wrong json'
    };
  }
}

// Validate Warehouse Stores Parameter
module.exports.warehouseStores = (stores) => {
  try {

    for (let i = 0; i < stores.length; i++) {

      if (!stores[i].hasOwnProperty('store_code')) return {
        success: false,
        msg: 'Missing store code parameter'
      };

      if (!stores[i].hasOwnProperty('store_name') || stores[i].store_name === undefined || stores[i].store_name === "" || Number.isInteger(stores[i].store_name)) return {
        success: false,
        msg: 'Missing store name parameter'
      };

      if (!stores[i].hasOwnProperty('address_one') || Number.isInteger(stores[i].address_one)) return {
        success: false,
        msg: 'Missing address one parameter'
      };

      if (!stores[i].hasOwnProperty('address_two') || Number.isInteger(stores[i].address_two)) return {
        success: false,
        msg: 'Missing address two parameter'
      };

      if (!stores[i].hasOwnProperty('landmark') || Number.isInteger(stores[i].landmark)) return {
        success: false,
        msg: 'Missing landmark parameter'
      };

      if (!stores[i].hasOwnProperty('city_id') || !Number.isInteger(stores[i].city_id)) return {
        success: false,
        msg: 'Missing city id parameter'
      };

      if (!stores[i].hasOwnProperty('locality_id') || !Number.isInteger(stores[i].locality_id)) return {
        success: false,
        msg: 'Missing locality id parameter'
      };

      if (!stores[i].hasOwnProperty('store_mobile') || stores[i].store_mobile === undefined || stores[i].store_mobile === "") return {
        success: false,
        msg: 'Missing store mobile parameter'
      };

      if (!stores[i].hasOwnProperty('store_email')) return {
        success: false,
        msg: 'Missing store email parameter'
      };

      if (!stores[i].hasOwnProperty('refund_on_discount')) return {
        success: false,
        msg: 'Missing refund on discount parameter'
      };

      if (!stores[i].hasOwnProperty('refund_policy') || Number.isInteger(stores[i].refund_policy)) return {
        success: false,
        msg: 'Missing refund policy parameter'
      };
    }

    if (stores.length !== 0) return {
      success: true,
      msg: 'Succesful'
    };
    else return {
      success: false,
      msg: 'Empty json'
    };

  } catch (error) {
    return {
      success: false,
      msg: 'Wrong json'
    };
  }
}

// Validate Warehouse Detail
module.exports.warehouseDetail = (warehouses) => {
  try {

    if (!warehouses.hasOwnProperty('warehouse_unique') || !Number.isInteger(warehouses.warehouse_unique)) return {
      success: false,
      msg: 'Missing warehouse unique'
    };

    if (!warehouses.hasOwnProperty('business_name') || Number.isInteger(warehouses.business_name)) return {
      success: false,
      msg: 'Missing business name'
    };

    if (!warehouses.hasOwnProperty('address_one') || Number.isInteger(warehouses.address_one)) return {
      success: false,
      msg: 'Missing address one'
    };

    if (!warehouses.hasOwnProperty('address_two') || Number.isInteger(warehouses.address_two)) return {
      success: false,
      msg: 'Missing address two'
    };

    if (!warehouses.hasOwnProperty('landmark') || Number.isInteger(warehouses.landmark)) return {
      success: false,
      msg: 'Missing landmark'
    };

    if (!warehouses.hasOwnProperty('city_id') || !Number.isInteger(warehouses.city_id)) return {
      success: false,
      msg: 'Missing city'
    };

    if (!warehouses.hasOwnProperty('locality_id') || !Number.isInteger(warehouses.locality_id)) return {
      success: false,
      msg: 'Missing locality'
    };

    if (!warehouses.hasOwnProperty('gstin')) return {
      success: false,
      msg: 'Missing gstin'
    };

    if (!warehouses.hasOwnProperty('cin')) return {
      success: false,
      msg: 'Missing cin'
    };

    if (!warehouses.hasOwnProperty('pan')) return {
      success: false,
      msg: 'Missing pan'
    };

    if (!warehouses.hasOwnProperty('mobile')) return {
      success: false,
      msg: 'Missing mobile'
    };

    if (!warehouses.hasOwnProperty('email')) return {
      success: false,
      msg: 'Missing email'
    };

    return {
      success: true,
      msg: 'Succesful'
    };

  } catch (error) {
    return {
      success: false,
      msg: 'Wrong json'
    };
  }
};


// Validate Warehouse Secrets
module.exports.warehouseSecrets = (secrets) => {
  try {

    for (let i = 0; i < secrets.length; i++) {

      if (!secrets[i].hasOwnProperty('warehouse_user_unique') ||
        !Number.isInteger(secrets[i].warehouse_user_unique))
        return {
          success: false,
          msg: 'Missing warehouse user unique'
        };

      if (!secrets[i].hasOwnProperty('password')) return {
        success: false,
        msg: 'Missing password'
      };

      if (!secrets[i].hasOwnProperty('role_unique') ||
        !Number.isInteger(secrets[i].role_unique))
        return {
          success: false,
          msg: 'Missing role unique'
        };

      if (!secrets[i].hasOwnProperty('branch_unique') ||
        !Number.isInteger(secrets[i].branch_unique))
        return {
          success: false,
          msg: 'Missing branch unique'
        };

      if (!secrets[i].hasOwnProperty('employe_unique') ||
        !Number.isInteger(secrets[i].employe_unique))
        return {
          success: false,
          msg: 'Missing employe unique'
        };

      if (secrets[i].warehouse_user_unique > 0 && secrets[i].employe_unique > 0) {

        if (secrets[i].password === null ||
          secrets[i].password === undefined ||
          secrets[i].password === "")
          return {
            success: false,
            msg: 'Password should not be empty or null'
          };

        if (secrets[i].role_unique === 0) return {
          success: false,
          msg: 'Role should not be empty or null'
        };

        if (secrets[i].branch_unique === 0) return {
          success: false,
          msg: 'Branch should not be zero'
        };

      } else if (secrets[i].warehouse_user_unique > 0) {
        if (secrets[i].password === null ||
          secrets[i].password === undefined ||
          secrets[i].password === "")
          return {
            success: false,
            msg: 'Password should not be empty or null'
          };

        if (secrets[i].role_unique === 0) return {
          success: false,
          msg: 'Role should not be empty or null'
        };
      } else if (secrets[i].employe_unique > 0) {

        if (secrets[i].branch_unique === 0) return {
          success: false,
          msg: 'Branch should not be zero'
        };
      }

      if (!secrets[i].hasOwnProperty('first_name') ||
        Number.isInteger(secrets[i].first_name))
        return {
          success: false,
          msg: 'Missing first name'
        };

      if (!secrets[i].hasOwnProperty('last_name') ||
        Number.isInteger(secrets[i].last_name))
        return {
          success: false,
          msg: 'Missing last name'
        };

      if (!secrets[i].hasOwnProperty('gender_id') ||
        !Number.isInteger(secrets[i].gender_id))
        return {
          success: false,
          msg: 'Missing gender id'
        };

      if (!secrets[i].hasOwnProperty('birth_date')) return {
        success: false,
        msg: 'Missing birth date'
      };

      if (!secrets[i].hasOwnProperty('mobile')) return {
        success: false,
        msg: 'Missing mobile'
      };

      if (!secrets[i].hasOwnProperty('email')) return {
        success: false,
        msg: 'Missing email'
      };

      if (!secrets[i].hasOwnProperty('department_name')) return {
        success: false,
        msg: 'Missing department name'
      };
    }

    if (secrets.length !== 0) return {
      success: true,
      msg: 'Succesful'
    };
    else return {
      success: false,
      msg: 'Empty json'
    };

  } catch (error) {
    return {
      success: false,
      msg: 'Wrong json'
    };
  }
};

// Validate Warehouse Secrets
module.exports.warehouseProductDetail = (products) => {
  try {

    for (let i = 0; i < products.length; i++) {

      if (!products[i].hasOwnProperty('product_barcode') ||
        !Number.isInteger(products[i].product_barcode))
        return {
          success: false,
          msg: 'Missing product barcode'
        };

      if (!products[i].hasOwnProperty('product_name') ||
        Number.isInteger(products[i].product_name) ||
        products[i].product_name === undefined ||
        products[i].product_name === null)
        return {
          success: false,
          msg: 'Missing product name'
        };

      if (!products[i].hasOwnProperty('brand_name')) return {
        success: false,
        msg: 'Missing brand name'
      };

      if (!products[i].hasOwnProperty('description')) return {
        success: false,
        msg: 'Missing description'
      };

      if (!products[i].hasOwnProperty('category_unique') ||
        !Number.isInteger(products[i].category_unique))
        return {
          success: false,
          msg: 'Missing category unique'
        };

      if (!products[i].hasOwnProperty('sub_category_unique') ||
        !Number.isInteger(products[i].sub_category_unique))
        return {
          success: false,
          msg: 'Missing sub category unique'
        };

      if (!products[i].hasOwnProperty('sub_sub_category_unique') ||
        !Number.isInteger(products[i].sub_sub_category_unique))
        return {
          success: false,
          msg: 'Missing sub sub category unique'
        };

      if (!products[i].hasOwnProperty('unit_unique') ||
        !Number.isInteger(products[i].unit_unique))
        return {
          success: false,
          msg: 'Missing unit unique'
        };

      if (!products[i].hasOwnProperty('unit_sub_unique') ||
        !Number.isInteger(products[i].unit_sub_unique))
        return {
          success: false,
          msg: 'Missing unit sub unique'
        };

      if (!products[i].hasOwnProperty('product_size') ||
        !Number.isInteger(products[i].product_size))
        return {
          success: false,
          msg: 'Missing product size'
        };

      if (!products[i].hasOwnProperty('selling_price') ||
        !Number.isInteger(products[i].selling_price))
        return {
          success: false,
          msg: 'Missing selling price'
        };

      if (!products[i].hasOwnProperty('product_margin') ||
        !Number.isInteger(products[i].product_margin))
        return {
          success: false,
          msg: 'Missing product margin'
        };

      if (!products[i].hasOwnProperty('sgst') ||
        !Number.isInteger(products[i].sgst))
        return {
          success: false,
          msg: 'Missing sgst'
        };

      if (!products[i].hasOwnProperty('cgst') ||
        !Number.isInteger(products[i].cgst))
        return {
          success: false,
          msg: 'Missing cgst'
        };

      if (!products[i].hasOwnProperty('igst') ||
        !Number.isInteger(products[i].igst))
        return {
          success: false,
          msg: 'Missing igst'
        };

      if (!products[i].hasOwnProperty('sgst') ||
        !Number.isInteger(products[i].sgst))
        return {
          success: false,
          msg: 'Missing sgst'
        };

      if (!products[i].hasOwnProperty('sodexo') ||
        !Number.isInteger(products[i].sodexo))
        return {
          success: false,
          msg: 'Missing sodexo'
        };

      if (!products[i].hasOwnProperty('product_quantity') ||
        !Number.isInteger(products[i].product_quantity))
        return {
          success: false,
          msg: 'Missing product quantity'
        };

      if (!products[i].hasOwnProperty('product_price') ||
        !Number.isInteger(products[i].product_price))
        return {
          success: false,
          msg: 'Missing product price'
        };

      if (!products[i].hasOwnProperty('staple') ||
        !Number.isInteger(products[i].staple))
        return {
          success: false,
          msg: 'Missing staple'
        };

      if (!products[i].hasOwnProperty('hsn') ||
        !Number.isInteger(products[i].hsn))
        return {
          success: false,
          msg: 'Missing hsn'
        };

      if (!products[i].hasOwnProperty('status') ||
        !Number.isInteger(products[i].status))
        return {
          success: false,
          msg: 'Missing status'
        };
    }

    if (products.length !== 0) return {
      success: true,
      msg: 'Succesful'
    };
    else return {
      success: false,
      msg: 'Empty json'
    };

  } catch (error) {
    return {
      success: false,
      msg: 'Wrong json'
    };
  }
};