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

  describe('Test DELETE /api/v1/meals/:mealId/foods/:id path', () => {
    test('should delete the food from the meal', async () => {
      let banana = await Food.create({name: 'Banana', calories: 150})
      let breakfast = await Meal.create({name: 'Breakfast'})

      return request(app).delete(`/api/v1/meals/${breakfast.id}/foods/${banana.id}`).send()
      .then(response => {
        expect(response.status).toBe(204)
      })
    })

    test('404 if either does not exist', async () => {
      return request(app).delete(`/api/v1/meals/0/foods/0`).send()
      .then(response => {
        expect(response.status).toBe(404)
      })
    })
  })
})
