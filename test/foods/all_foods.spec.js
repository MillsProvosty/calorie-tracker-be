const shell = require('shelljs')
const request = require("supertest")
const app = require('../../app')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('db', 'username', 'postgres', {dialect: 'postgres'})
const Food = require('../../models').Food

describe('api', () => {
  beforeAll(() => {
    sequelize.close()
    shell.exec('npx sequelize db:migrate --env test')
    shell.exec('npx sequelize db:seed:all --env test')
  })
  afterAll(() => {
    shell.exec('npx sequelize db:migrate:undo:all --env test')
    sequelize.close()
  })

  describe('Test GET /api/v1/foods path', () => {

    test('should return all 10 foods from seeds', async () => {
      return request(app)
      .get('/api/v1/foods')
      .send()
      .then(response => {
        expect(response.status).toBe(200)
        expect(Object.keys(response.body).length).toBe(10)
        expect(Object.keys(response.body[0])).toContain('id')
        expect(Object.keys(response.body[0])).toContain('name')
        expect(Object.keys(response.body[0])).toContain('calories')
        expect(Object.keys(response.body[0])).toContain('createdAt')
        expect(Object.keys(response.body[0])).toContain('updatedAt')
      })
      .catch(error => {
        expect(error == false)
      })
    })

    test('should return a 500 error', async () => {
      shell.exec('npx sequelize db:migrate:undo:all --env test')

      return request(app)
      .get('/api/v1/foods')
      .send()
      .then(response => {
        expect(response.status).toBe(500)
        expect(Object.keys(response.body).length).toBe(1)
      })
      .catch(error => {
        expect(error == false)
      })
    })

  })
})
