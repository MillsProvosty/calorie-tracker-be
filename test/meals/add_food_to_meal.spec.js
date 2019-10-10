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

  describe('Test POST /api/v1/meals/:id/foods path', () => {
    test('should return 1 meal and its foods', async () => {
      var service = { "food": { "name": "Cherry", "calories": "25"} };
      let breakfast = await Meal.create({name: 'Breakfast'})

      return request(app).post(`/api/v1/meals/${breakfast.id}/foods`).send()
      .then(response => {
        expect(response.status).toBe(201)
        expect(response.body.message).toBe("Successfully added Cherry to Breakfast")
      })
    })
  })
})
