'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING
  }, {});
  Meal.associate = function(models) {
    Meal.hasMany(models.FoodMeal, {onDelete: 'cascade'});
    Meal.belongsToMany(models.Food, {
      through: models.FoodMeal,
      foreignKey: 'MealId'
    });
  };
  return Meal;
};
