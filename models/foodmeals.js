'use strict';
module.exports = (sequelize, DataTypes) => {
  const FoodMeals = sequelize.define('FoodMeals', {
    foodId: DataTypes.INTEGER,
    mealId: DataTypes.INTEGER
  }, {});
  FoodMeals.associate = function(models) {
    FoodMeals.belongsTo(models.Meal, {foreignKey: 'mealId'});
    FoodMeals.belongsTo(models.Food, {foreignKey: 'foodId'});
  };
  return FoodMeals;
};
