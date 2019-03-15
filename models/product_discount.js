'use strict';
module.exports = (sequelize, DataTypes) => {
  var productDiscount = sequelize.define('product_discount', {
    product_discount_id: DataTypes.INTEGER,
    discount_base_id: DataTypes.INTEGER,
    product_discount_name: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    status: DataTypes.BOOLEAN,
  }, {});
  productDiscount.associate = function(models) {
    // associations can be defined here
  };
  return productDiscount;
};