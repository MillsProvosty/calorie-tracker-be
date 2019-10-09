const shell = require('shelljs')
const request = require("supertest")
const app = require('../../app')

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

  describe('Test POST /api/v1/foods path', () => {

    test('should create a new food', async () => {
      var service = { "food":
                      { "name": "Cherry",
                      "calories": "25"}
                    }

      return request(app).post('/api/v1/foods').send(service)
      .then(response => {
        expect(response.status).toBe(200)

        body = { "id": 11,
                 "name": "Cherry",
                 "calories": 25 }

        expect(response.body).toEqual(body)
      })

      return request(app).get('/api/v1/foods').send()
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(11)
        expect(Object.keys(response.body[10]).length).toBe(3)
        expect(Object.keys(response.body[10])).toContain('id')
        expect(Object.keys(response.body[10])).toContain('name')
        expect(Object.keys(response.body[10])).toContain('calories')
      })
    })

    test('should return a 500 error', () => {
      shell.exec('npx sequelize db:migrate:undo:all --env test')

      return request(app).post('/api/v1/foods').send()
      .then(response => {
        expect(response.status).toBe(500)
      })
    })

  })
})
