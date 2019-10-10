const shell = require('shelljs');
const request = require("supertest");
const app = require('../../app');
const Food = require('../../models').Food;

describe('api', () => {
  afterAll(async () => {
    await Food.destroy({where:{}})
  })

  describe('Test POST /api/v1/foods path', () => {

    test('should create a new food', async () => {
      var service = { "food":
                      { "name": "Cherry",
                      "calories": "25"}
                    };

      return request(app).post('/api/v1/foods').send(service)
      .then(response => {
        expect(response.status).toBe(200)
        expect(Object.keys(response.body).length).toBe(3)
        expect(Object.keys(response.body)).toContain('id')
        expect(Object.keys(response.body)).toContain('name')
        expect(response.body.name).toEqual('Cherry')
        expect(Object.keys(response.body)).toContain('calories')
        expect(response.body.calories).toEqual(25)
      })

      return request(app).get('/api/v1/foods').send()
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(11)
        expect(Object.keys(response.body[10]).length).toBe(3)
        expect(Object.keys(response.body[10])).toContain('id')
        expect(Object.keys(response.body[10])).toContain('name')
        expect(Object.keys(response.body[10])).toContain('calories')
      })
    })

    test('food must be unique', async () => {
      await Food.create({name: 'Banana', calories: 150})
      var service = { "food": {"name": "Banana", "calories": "25"} }

      return request(app).post('/api/v1/foods').send(service)
      .then(response => {
        expect(response.status).toBe(400)
      })

      return request(app).get('/api/v1/foods').send()
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(10)
      })
    })

  })
})
