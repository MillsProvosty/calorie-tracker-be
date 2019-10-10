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

    test('should return a 204 error', () => {
      shell.exec('npx sequelize db:migrate:undo:all --env test');
      return request(app).get('/api/v1/meals').send()
      .then(response => {
        console.log(response.body)
        expect(response.status).toBe(204)
      })
    })
  })
})
