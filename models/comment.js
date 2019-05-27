'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    message: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true,
        len: [3, 255]
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        isNumeric: true,
        min: 1,
        max: 5
      }
    },
    MovieId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        isNumeric: true
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    freezeTableName: true
  });

  Comment.associate = function(models) {
    Comment.belongsTo(models.User);
  }

  return Comment;
};