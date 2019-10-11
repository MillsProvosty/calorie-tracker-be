const shell = require('shelljs');
const request = require("supertest");
const app = require('../../app');
const Food = require('../../models').Food;

describe('api', () => {
  afterAll(async () => {
    await Food.destroy({where:{}})
  })

  describe('Test POST /api/v1/foods path', () => {

    test('should create a new food', () => {
      var service = { "food": { "name": "Cherry", "calories": "25"} };

      return request(app).post('/api/v1/foods').send(service)
      .then(response => {
        expect(response.status).toBe(200)
        expect(Object.keys(response.body).length).toBe(3)
        expect(Object.keys(response.body)).toContain('id')
        expect(Object.keys(response.body)).toContain('name')
        expect(response.body.name).toEqual('Cherry')
        expect(Object.keys(response.body)).toContain('calories')
        expect(response.body.calories).toEqual(25)
        expect(Object.keys(response.body)).not.toContain('createdAt')
        expect(Object.keys(response.body)).not.toContain('updatedAt')
      })
    })

    test('there should now be 1 food', () => {
      return request(app).get('/api/v1/foods').send()
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(1)
        expect(Object.keys(response.body[0]).length).toBe(3)
        expect(Object.keys(response.body[0])).toContain('id')
        expect(Object.keys(response.body[0])).toContain('name')
        expect(Object.keys(response.body[0])).toContain('calories')
      })
    })

    test('food must be unique', async () => {
      var service = { "food": {"name": "Cherry", "calories": "25"} }

      return request(app).post('/api/v1/foods').send(service)
      .then(response => {
        expect(response.status).toBe(400)
      })
    })

    test('there should still only 1 be food', () => {
      return request(app).get('/api/v1/foods').send()
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(1)
      })
    })

    test('fields cannot be blank', async () => {
      var service = { "food": {"name": "", "calories": "25"} }

      return request(app).post('/api/v1/foods').send(service)
      .then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toBe("Name and calories cannot be blank.")
      })
    })
  })
})
