const shell = require('shelljs');
const request = require("supertest");
const app = require('../../app');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  })
  afterAll(async () => {
    shell.exec('npx sequelize db:migrate:undo:all')
    await new Promise(resolve => setTimeout(() => resolve(), 500))
  })

  describe('Test GET /api/v1/foods path', () => {

    test('should return all 10 foods from seeds', async () => {
      return request(app).get('/api/v1/foods').send()
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(10)
        expect(Object.keys(response.body[0]).length).toBe(3)
        expect(Object.keys(response.body[0])).toContain('id')
        expect(Object.keys(response.body[0])).toContain('name')
        expect(Object.keys(response.body[0])).toContain('calories')
        expect(Object.keys(response.body[0])).not.toContain('createdAt')
        expect(Object.keys(response.body[0])).not.toContain('UpdatedAt')
      })
    })

    test('should return a 500 error', () => {
      shell.exec('npx sequelize db:migrate:undo:all --env test')

      return request(app).get('/api/v1/foods').send()
      .then(response => {
        expect(response.status).toBe(500)
        expect(Object.keys(response.body).length).toBe(1)
      })
    })

  })
})
