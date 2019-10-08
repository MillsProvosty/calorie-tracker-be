const shell = require('shelljs')
const request = require("supertest")
const app = require('../../app')

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:migrate --env test')
    shell.exec('npx sequelize db:seed:all --env test')
  })
  afterAll(() => {
    shell.exec('npx sequelize db:migrate:undo:all --env test')
  })

  describe('Test GET /api/v1/foods/:id path', () => {

    test('should return all 1 food from seeds', () => {
      return request(app)
      .get('/api/v1/foods/1')
      .send()
      .then(response => {
        expect(response.status).toBe(200)
        expect(Object.keys(response.body).length).toBe(1)
        expect(Object.keys(response.body[0])).toContain('id')
        expect(Object.keys(response.body[0])).toContain('name')
        expect(Object.keys(response.body[0])).toContain('calories')
        expect(Object.keys(response.body[0])).toContain('createdAt')
        expect(Object.keys(response.body[0])).toContain('updatedAt')
      })
    })

    // test('should return a 500 error', () => {
    //   shell.exec('npx sequelize db:migrate:undo:all --env test')
    //
    //   return request(app)
    //   .get('/api/v1/foods')
    //   .send()
    //   .then(response => {
    //     expect(response.status).toBe(500)
    //     expect(Object.keys(response.body).length).toBe(1)
    //   })
    // })

  })
})
