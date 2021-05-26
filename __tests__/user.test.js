const app = require('../index')
const request = require('supertest')

beforeAll(done => {
    done()
  })

describe("GET /users", () => {
    test('it should return an array of users', async () => {
        const response = await request(app).get("/users");
        expect(response.body).toBeInstanceOf(Array)
        expect(response.statusCode).toBe(200)
    })
})

describe("GET /users/:id", () => {
    test("it should return an object with the user", async () => {
        const response = await request(app).get("/users/1")
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("user_id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.statusCode).toBe(200)
    })

    test("it should return an error object", async () => {
        const response = await request(app).get("/users/teste")
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toEqual(true)
        expect(response.statusCode).toBe(400)
    })
})

describe("POST /users", () => {
    test('it should return an object with a success message and the user id', async () => {
        const mockUser = {
            name: "Test User",
            email: "testuser" + Math.floor(Math.random() * 100) + "@email.com",
            password: "123456"
        }
        const response = await request(app).post("/users").send(mockUser)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("savedUser")
        expect(response.statusCode).toBe(201)
    })

    test('it should return an object with msg and error properties', async () => {
        const mockUser = {
            name: "Test User",
            password: "123456"
        }
        const response = await request(app).post('/users').send(mockUser)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("error")
        expect(response.body).toHaveProperty("msg")
        expect(response.statusCode).toBe(400)
    })
})

describe("PUT /users/:user_id", () => {
    test("it should return an object with a success message and the user id", async () => {
        const mockUser = {
            name: "Test User Updated",
            email: "testuser" + Math.floor(Math.random() * 100) + "@email.com",
            password: "123456"
        }
        const response = await request(app).put("/users/3").send(mockUser)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("updatedUser")
        expect(response.statusCode).toBe(200)
    })

    test('it should return an object with msg and error properties', async () => {
        const mockUser = {
            name: "Test User",
            password: "123456"
        }
        const response = await request(app).put('/users/3').send(mockUser)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("error")
        expect(response.body).toHaveProperty("msg")
        expect(response.statusCode).toBe(400)
    })
})

describe("DELETE /users/:id", () => {
    test("it should return status 204 and deleted_at shouldn't be null", async () => {
        const responseGetAll = await request(app).get('/users')
        const lastUser = responseGetAll.body[responseGetAll.body.length - 1]
        const responseDelete = await request(app).delete(`/users/${lastUser.user_id}`)
        expect(responseDelete.statusCode).toBe(204)
        const responseDeleted = await request(app).get(`/users/${lastUser.user_id}`)
        expect(responseDeleted.body.deleted_at).not.toBeNull()
    })

    test("it should return status 400 and an object with msg and error properties", async () => {
        const response = await request(app).delete(`/users/xx`)
        expect(response.body).toHaveProperty("error")
        expect(response.body).toHaveProperty("msg")
        expect(response.statusCode).toBe(400)
    })
})

afterAll(done => {
    done()
})