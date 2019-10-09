const shell = require('shelljs');
const request = require("supertest");
const app = require('../../app');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create');
    shell.exec('npx sequelize db:migrate');
    shell.exec('npx sequelize db:seed:all');
  })
  afterAll(async () => {
    shell.exec('npx sequelize db:migrate:undo:all');
    await new Promise(resolve => setTimeout(() => resolve(), 500))
  })

  describe('Test DELETE /api/v1/foods/:id path', () => {

    test('should update an existing food', async () => {
      return request(app).delete('/api/v1/foods/1').send()
      .then(response => {
        expect(response.status).toBe(204)
        expect(response.body).toEqual(body)
      })

      return request(app).get('/api/v1/foods/1').send()
      .then(response => expect(response.status).toBe(404))

      return request(app).get('/api/v1/foods').send()
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(10)
      })
    })

    test('should return a 500 error', () => {
      shell.exec('npx sequelize db:migrate:undo:all --env test');
      return request(app).patch('/api/v1/foods/1').send()
      .then(response => expect(response.status).toBe(500))
    })

  })
})
