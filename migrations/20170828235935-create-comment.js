'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.TEXT, 
        allowNull: false
      },
      rating: {
        type: Sequelize.INTEGER, 
        allowNull: false
      },
      MovieId: {
        type: Sequelize.INTEGER, 
        allowNull: false
      },
      UserId: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
        references: {
          model: 'Users',
          key: 'id'
        }, 
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Comments');
  }
};