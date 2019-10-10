const shell = require('shelljs');
const request = require("supertest");
const app = require('../../app');
const Meal = require('../../models').Meal;

describe('api', () => {
  beforeAll(async () => {
    var data = [{name: 'Breakfast'},
                {name: 'Dessert'}];
    await Meal.bulkCreate(data, {returning: true})
  })
  afterAll(async () => {
    await Meal.destroy({where:{}})
  })

  describe('Test GET /api/v1/meals path', () => {

    test('should return all 2 meals from seeds', async () => {
      return request(app).get('/api/v1/meals').send()
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(2)
        console.log("this is being returned for all meals:")
        expect(Object.keys(response.body[0]).length).toBe(3)
        expect(Object.keys(response.body[0])).toContain('id')
        expect(Object.keys(response.body[0])).toContain('name')
        expect(Object.keys(response.body[0])).toContain('Food')
        expect(Object.keys(response.body[0])).not.toContain('createdAt')
        expect(Object.keys(response.body[0])).not.toContain('UpdatedAt')
      })
    })
  })
})
