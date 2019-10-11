const shell = require('shelljs');
const request = require("supertest");
const app = require('../../app');
const Food = require('../../models').Food;

describe('api', () => {
  afterAll(async () => {
    await Food.destroy({where:{}})
  })

  describe('Test GET /api/v1/foods/:id path', () => {
    test('should return 1 food from seeds', async () => {
      let banana = await Food.create({name: 'Banana', calories: 150})

      return request(app).get(`/api/v1/foods/${banana.id}`).send()
      .then(response => {
        expect(response.status).toBe(200)
        expect(Object.keys(response.body).length).toBe(3)
        expect(Object.keys(response.body)).toContain('id')
        expect(Object.keys(response.body)).toContain('name')
        expect(Object.keys(response.body)).toContain('calories')
        expect(Object.keys(response.body)).not.toContain('createdAt')
        expect(Object.keys(response.body)).not.toContain('updatedAt')
      })
    })

    test('should return 404 for bad id', () => {
      return request(app).get('/api/v1/foods/20').send()
      .then(response => {
        expect(response.status).toBe(404)
      })
    })
  })
})
