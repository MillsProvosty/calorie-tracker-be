'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER
  }, {});
  Food.associate = function(models) {
    Food.hasMany(models.FoodMeal, {onDelete: 'cascade'});
    Food.belongsToMany(models.Meal, {
      through: models.FoodMeal,
      foreignKey: 'FoodId'
    });
  };
  return Food;
};
