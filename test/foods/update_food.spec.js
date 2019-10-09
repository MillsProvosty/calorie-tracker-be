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

  describe('Test PATCH /api/v1/foods/:id path', () => {

    test('should update an existing food', async () => {
      var service = { "food":
                      { "name": "Cherry",
                      "calories": "25"}
                    };

      return request(app).patch('/api/v1/foods/1').send(service)
      .then(response => {
        expect(response.status).toBe(200)

        let body = { "id": 1,
                 "name": "Cherry",
                 "calories": 25 };

        expect(response.body).toEqual(body)
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

    test('should return a 500 error', () => {
      shell.exec('npx sequelize db:migrate:undo:all --env test');
      var service = { "food":
                      { "name": "Cherry",
                      "calories": "25"}
                    };

      return request(app).patch('/api/v1/foods/1').send(service)
      .then(response => {
        expect(response.status).toBe(500)
      })
    })

  })
})
