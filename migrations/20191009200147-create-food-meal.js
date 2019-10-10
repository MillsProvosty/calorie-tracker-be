'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FoodMeals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FoodId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Food',
          key: 'id'
        }
      },
      MealId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Meals',
          key: 'id'
        }
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('FoodMeals');
  }
};
