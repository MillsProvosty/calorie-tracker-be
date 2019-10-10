'use strict';
module.exports = (sequelize, DataTypes) => {
  const FoodMeal = sequelize.define('FoodMeal', {
    FoodId: {
      type: DataTypes.INTEGER,
      primaryKey: false,
      references: {
        model: 'Food',
        key: 'FoodId'
      },
      onDelete: 'cascade'
    },
    MealId: {
      type: DataTypes.INTEGER,
      primaryKey: false,
      references: {
        model: 'Meal',
        key: 'MealId'
      },
      onDelete: 'cascade'
    }
  }, {});
  FoodMeal.associate = function(models) {
    FoodMeal.belongsTo(models.Meal, {
      onDelete: 'cascade',
      foreignKey: 'MealId',
      foreignkey: { allowNull: false }
    })
    FoodMeal.belongsTo(models.Food, {
      onDelete: 'cascade',
      foreignKey: 'FoodId',
      foreignKey: { allowNull: false }
    })
  };
  return FoodMeal;
};
