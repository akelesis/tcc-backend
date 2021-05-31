const request = require('supertest')
const app = require("../index")
const {migrate, rollback, destroy} = require("./testUtils")

describe("Professors Test Suite", () => {

    beforeAll(async () => {
        await migrate()
        
    })

    afterAll(async () => {
        app.close()
    })

    describe("GET /professors", () => {
        test('it should return an array of professors', async () => {
            const response = await request(app).get("/professors");
            expect(response.body).toBeInstanceOf(Array)
            expect(response.statusCode).toBe(200)
        })
    })
})

