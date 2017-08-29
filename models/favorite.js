'use strict';
module.exports = function(sequelize, DataTypes) {
  var Favorite = sequelize.define('Favorite', {
    title: {
      type: DataTypes.STRING, 
      validate: {
        notEmpty: true
      }
    },
    overview: {
      type: DataTypes.TEXT, 
      validate: {
        notEmpty: true
      }
    }, 
    post_path: {
      type: DataTypes.STRING, 
      validate: {
        notEmpty: true
      }
    }, 
    UserId: {
      type: DataTypes.INTEGER, 
      validate: {
        notEmpty: true,
        isNumeric: true
      }
    }, 
    MovieId: {
      type: DataTypes.INTEGER, 
      validate: {
        notEmpty: true,
        isNumeric: true        
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Favorite.belongsTo(models.User);
      }
    }
  });
  return Favorite;
};