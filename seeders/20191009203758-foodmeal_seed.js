'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('FoodMeals', [{
      FoodId: 1,
      MealId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      FoodId: 5,
      MealId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      FoodId: 6,
      MealId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      FoodId: 10,
      MealId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      FoodId: 2,
      MealId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      FoodId: 3,
      MealId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      FoodId: 1,
      MealId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('FoodMeals', null, {});
  }
};
