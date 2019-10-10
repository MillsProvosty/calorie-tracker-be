const shell = require('shelljs');
const request = require("supertest");
const app = require('../../app');
const Food = require('../../models').Food;
const Meal = require('../../models').Meal;
const FoodMeal = require('../../models').FoodMeal;

describe('api', () => {
  afterAll(async () => {
    await FoodMeal.destroy({where:{}})
    await Meal.destroy({where:{}})
    await Food.destroy({where:{}})
  })

  describe('Test DELETE /api/v1/foods/:id path', () => {

    test('should delete an existing food', async () => {
      let banana = await Food.create({name: 'Banana', calories: 150})

      return request(app).delete(`/api/v1/foods/${banana.id}`).send()
      .then(response => expect(response.status).toBe(204))

      return request(app).get(`/api/v1/foods/${banana.id}`).send()
      .then(response => expect(response.status).toBe(400))

      return request(app).get('/api/v1/foods').send()
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(0)
      })
    })

    test('should not delete an existing food if it is in a meal', async () => {
      let banana = await Food.create({name: 'Banana', calories: 150})
      let meal = await Meal.create({name: 'Breakfast'})
      await FoodMeal.create({FoodId: banana.id, MealId: meal.id})

      return request(app).delete(`/api/v1/foods/${banana.id}`).send()
      .then(response => expect(response.status).toBe(400))

      return request(app).get('/api/v1/foods').send()
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(1)
      })
    })

  })
})
