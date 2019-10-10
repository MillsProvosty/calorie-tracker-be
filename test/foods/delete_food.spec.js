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
    shell.exec('npx sequelize db:drop --env test')
    await new Promise(resolve => setTimeout(() => resolve(), 500))
  })

  describe('Test DELETE /api/v1/foods/:id path', () => {

    test('should update an existing food', async () => {
      return request(app).delete('/api/v1/foods/4').send()
      .then(response => expect(response.status).toBe(204))

      return request(app).get('/api/v1/foods/4').send()
      .then(response => expect(response.status).toBe(400))

      return request(app).get('/api/v1/foods').send()
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(9)
      })
    })

    test('should update an existing food even if it is in a meal', async () => {
      return request(app).delete('/api/v1/foods/1').send()
      .then(response => expect(response.status).toBe(204))

      return request(app).get('/api/v1/foods/1').send()
      .then(response => expect(response.status).toBe(400))

      return request(app).get('/api/v1/foods').send()
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(8)
      })
    })

    test('should return a 404 error', () => {
      shell.exec('npx sequelize db:migrate:undo:all --env test');
      return request(app).delete('/api/v1/foods/1').send()
      .then(response => expect(response.status).toBe(404))
    })

  })
})
