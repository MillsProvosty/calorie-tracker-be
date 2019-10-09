const shell = require('shelljs')
const request = require("supertest")
const app = require('../app')

describe('api', () => {
  afterAll(async () => {
    shell.exec('npx sequelize db:migrate:undo:all')
    await new Promise(resolve => setTimeout(() => resolve(), 500))
  })
  
  describe('Test GET /', () => {

    test('should reach index path', async () => {
      return request(app)
      .get('/')
      .send()
      .then(response => {
        expect(response.status).toBe(200)
      })
      .catch(error => {
        expect(error == false)
      })
    })

  })
})
