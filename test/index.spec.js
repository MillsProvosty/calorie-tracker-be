const shell = require('shelljs')
const request = require("supertest")
const app = require('../app')

describe('api', () => {
  beforeAll(async () => {
    shell.exec('npx sequelize db:create --env test')
    shell.exec('npx sequelize db:migrate --env test')
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
