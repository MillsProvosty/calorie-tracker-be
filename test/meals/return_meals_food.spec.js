const shell = require('shelljs');
const request = require("supertest");
const app = require('../../app');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:drop --env test')
    shell.exec('npx sequelize db:create --env test');
    shell.exec('npx sequelize db:migrate --env test');
    shell.exec('npx sequelize db:seed:all --env test');
  })
  afterAll(async () => {
    shell.exec('npx sequelize db:migrate:undo:all --env test');
    await new Promise(resolve => setTimeout(() => resolve(), 500))
  })

  describe('Test GET /api/v1/meals/:id/foods path', () => {

    test('should return 1 meal and all the associated foods from seeds', () => {
      return request(app).get('/api/v1/meals/1/foods').send()
      .then(response => {
        expect(response.status).toBe(200)
        expect(Object.keys(response.body).length).toBe(3)
        expect(Object.keys(response.body)).toContain('id')
        expect(Object.keys(response.body)).toContain('name')
        expect(Object.keys(response.body)).toContain('Food')
        expect(Object.keys(response.body)).not.toContain('createdAt')
        expect(Object.keys(response.body)).not.toContain('updatedAt')
      })
    })

    test('should return 404 for bad id', () => {
      return request(app).get('/api/v1/meals/200/foods').send()
      .then(response => {
        expect(response.status).toBe(404)
      })
    })

    test('should return a 500 error', () => {
      shell.exec('npx sequelize db:migrate:undo:all --env test');

      return request(app)
      .get('/api/v1/meals/1/foods')
      .send()
      .then(response => {
        expect(response.status).toBe(500)
        expect(Object.keys(response.body).length).toBe(1)
      })
    })
  })
})
