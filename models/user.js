'use strict';
const bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING, 
      unique: true, 
      validate: {
        len: [4, 30],
        isAlphanumeric: true, 
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING, 
      unique: true, 
      validate: {
        isEmail: true, 
        notEmpty: true
      } 
    },
    // as is not allowing users to update info, if implemented later 
    // then need to skip validation here and set up new custom validation
    // and check for this.isNewRecord or use .save(fields: [...]) syntax
    // to specify exactly which fields changed w/ only changed fields 
    // having validates run against them
    password: {
      type: DataTypes.STRING, 
      validate: {
        notEmpty: true, 
        len: [8, 50]
      }      
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  User.beforeCreate((user) => {
    let salt = bcrypt.genSaltSync(12);
    let hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  });

  return User;
};
