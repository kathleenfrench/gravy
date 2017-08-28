'use strict';
const bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
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
