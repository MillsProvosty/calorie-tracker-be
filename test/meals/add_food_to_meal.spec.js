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

  describe('Test POST /api/v1/meals/:mealId/foods/:id path', () => {
    test('should add the food to the meal', async () => {
      let banana = await Food.create({name: 'Banana', calories: 150})
      breakfast = await Meal.create({name: 'Breakfast'})

      return request(app).post(`/api/v1/meals/${breakfast.id}/foods/${banana.id}`).send()
      .then(response => {
        expect(response.status).toBe(201)
        expect(response.body).toBe("Successfully added Banana to Breakfast")
      })
    })

    test('banana should be in breakfast', async () => {
      return request(app).get(`/api/v1/meals/${breakfast.id}/foods`).send()
      .then(response => {
      
        expect(response.status).toBe(200)
        expect(Object.keys(response.body).length).toBe(3)
        expect(Object.keys(response.body)).toContain('id')
        expect(Object.keys(response.body)).toContain('name')
        expect(Object.keys(response.body)).toContain('Food')
        expect(response.body.Food[0].name).toBe('Banana')
        expect(Object.keys(response.body)).not.toContain('createdAt')
        expect(Object.keys(response.body)).not.toContain('updatedAt')
      })
    })

    test('should not work if the food is already in the meal', async () => {
      let cherry = await Food.create({name: 'Cherry', calories: 150})
      await FoodMeal.create({FoodId: cherry.id, MealId: breakfast.id})

      return request(app).post(`/api/v1/meals/${breakfast.id}/foods/${cherry.id}`).send()
      .then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toBe("Food already in meal.")
      })
    })

    test('404 if either does not exist', async () => {
      return request(app).post(`/api/v1/meals/0/foods/0`).send()
      .then(response => {
        expect(response.status).toBe(404)
      })
    })
  })
})
