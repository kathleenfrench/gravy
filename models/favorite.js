'use strict';
module.exports = function(sequelize, DataTypes) {
  var Favorite = sequelize.define('Favorite', {
    title: DataTypes.STRING,
    overview: DataTypes.TEXT,
    post_path: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    MovieId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Favorite.belongsTo(models.User);
      }
    }
  });
  return Favorite;
};