const shell = require('shelljs');
const request = require("supertest");
const app = require('../../app');
const Meal = require('../../models').Meal;
const Food = require('../../models').Food;
const FoodMeal = require('../../models').FoodMeal;

describe('api', () => {
  afterAll(async () => {
    await FoodMeal.destroy({where:{}})
    await Meal.destroy({where:{}})
    await Food.destroy({where:{}})
  })

  describe('Test GET /api/v1/meals/:id/foods path', () => {
    test('should return 1 meal and its foods', async () => {
      let banana = await Food.create({name: 'Banana', calories: 150})
      let apple = await Food.create({name: 'Apple', calories: 95})
      let kumquat = await Food.create({name: 'Kumquat', calories: 13})
      let cheese = await Food.create({name: 'String Cheese', calories: 80})
      let coffee = await Food.create({name: 'Black Coffee', calories: 1})
      let bagel = await Food.create({name: 'Plain Bagel', calories: 245})
      let steak = await Food.create({name: 'Steak', calories: 679})
      let milk = await Food.create({name: 'Milk', calories: 103})
      let yogurt = await Food.create({name: 'Yogurt', calories: 100})
      let iceCream = await Food.create({name: 'Vanilla Ice Cream', calories: 137})
      let breakfast = await Meal.create({name: 'Breakfast'})
      let dessert = await Meal.create({name: 'Dessert'})
      var data = [{FoodId: banana.id, MealId: breakfast.id},
                  {FoodId: coffee.id, MealId: breakfast.id},
                  {FoodId: bagel.id, MealId: breakfast.id},
                  {FoodId: iceCream.id, MealId: dessert.id},
                  {FoodId: apple.id, MealId: dessert.id},
                  {FoodId: kumquat.id, MealId: dessert.id},
                  {FoodId: banana.id, MealId: dessert.id}]
      await FoodMeal.bulkCreate(data, {returning: true})

      return request(app).get(`/api/v1/meals/${breakfast.id}/foods`).send()
      .then(response => {
        expect(response.status).toBe(200)
        expect(Object.keys(response.body).length).toBe(3)
        expect(Object.keys(response.body)).toContain('id')
        expect(Object.keys(response.body)).toContain('name')
        expect(Object.keys(response.body)).toContain('Food')
        expect(Object.keys(response.body)).not.toContain('createdAt')
        expect(Object.keys(response.body)).not.toContain('updatedAt')
      })
    })
  })
})
