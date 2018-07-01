"use strict";
module.exports = (sequelize, DataTypes) => {
  var input_type = sequelize.define(
    "input_type",
    {
      input_name: DataTypes.STRING,
      min: DataTypes.STRING,
      max: DataTypes.STRING,
      comment: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  input_type.associate = function(models) {
    // associations can be defined here
  };
  return input_type;
};
