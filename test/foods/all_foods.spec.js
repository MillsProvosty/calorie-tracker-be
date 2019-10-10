const shell = require('shelljs');
const request = require("supertest");
const app = require('../../app');
const Food = require('../../models').Food;

describe('api', () => {
  beforeAll(async () => {
    var data = [{name: 'Banana', calories: 150},
                {name: 'Apple', calories: 95}];
    await Food.bulkCreate(data, {returning: true})
  })
  afterAll(async () => {
    await Food.destroy({where:{}})
  })

  describe('Test GET /api/v1/foods path', () => {

    test('should return 2 foods', async () => {
      return request(app).get('/api/v1/foods').send()
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(2)
        expect(Object.keys(response.body[0]).length).toBe(3)
        expect(Object.keys(response.body[0])).toContain('id')
        expect(Object.keys(response.body[0])).toContain('name')
        expect(Object.keys(response.body[0])).toContain('calories')
        expect(Object.keys(response.body[0])).not.toContain('createdAt')
        expect(Object.keys(response.body[0])).not.toContain('UpdatedAt')
      })
    })

  })
})
