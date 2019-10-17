const shell = require('shelljs');
const request = require("supertest");
const app = require('../../app');
const Food = require('../../models').Food;

describe('api', () => {
  afterAll(async () => {
    await Food.destroy({where:{}})
  })

  describe('Test PUT /api/v1/foods/:id path', () => {

    test('should update an existing food', async () => {
      let banana = await Food.create({name: 'Banana', calories: 150})
      var service = { "food": {"name": "Cherry", "calories": "25"} };

      return request(app).put(`/api/v1/foods/${banana.id}`).send(service)
      .then(response => {
        expect(response.status).toBe(200)
        expect(Object.keys(response.body).length).toBe(3)
        expect(Object.keys(response.body)).toContain('id')
        expect(Object.keys(response.body)).toContain('name')
        expect(response.body.name).toEqual('Cherry')
        expect(Object.keys(response.body)).toContain('calories')
        expect(response.body.calories).toEqual(25)
      })

      return request(app).get('/api/v1/foods/1').send()
      .then(response => {
        expect(response.status).toBe(200)
        expect(Object.keys(response.body).length).toBe(3)
        expect(Object.keys(response.body)).toContain('id')
        expect(Object.keys(response.body)).toContain('name')
        expect(Object.keys(response.body)).toContain('calories')
        expect(response.body.name).toBe('Cherry')
        expect(response.body.calories).toBe(25)
      })
    })

    test('should return 400 for bad id', () => {
      var service = { "food": { "name": "Cherry", "calories": "25"} };
      return request(app).put('/api/v1/foods/145').send(service)
      .then(response => expect(response.status).toBe(400))
    })

    test('fields cannot be blank', async () => {
      var service = { "food": { "name": "", "calories": "25"} };

      return request(app).post('/api/v1/foods').send(service)
      .then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toBe("Name and calories cannot be blank.")
      })
    })

  })
})
