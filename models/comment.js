'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    message: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    MovieId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Comment.belongsTo(models.User);
      }
    }
  });
  return Comment;
};