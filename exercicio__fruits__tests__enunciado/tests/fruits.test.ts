import { app } from "index";
import supertest from "supertest";

describe('Test api fruits: POST /fruits', () => {
    it('Send correct object expecting status 201: Created', async () =>{
        const result = await supertest(app).post('/fruits').send({
            name: "banana",
            price: 25
        })
        expect(result.status).toBe(201);
    })
    it('Send fruits with the same name expecting status 409: Conflict', async () =>{
        await supertest(app).post('/fruits').send({
            name: "banana",
            price: 25
        })
        const result = await supertest(app).post('/fruits').send({
            name: "banana",
            price: 25
        })
        expect(result.status).toBe(409);
    })
    it('Send empty object expecting status 422: Unprocessable Entity', async () =>{
        const result = await supertest(app).post('/fruits').send({})
        expect(result.status).toBe(422);
    }) 
})

describe('Test api fruits: GET /fruits', () => {
    it('Get correct object expecting status 200: OK', async () =>{
        const result = await supertest(app).post('/fruits').send({
            name: "banana",
            price: 25
        })
        const getResult = await supertest(app).get('/fruits')

        expect(getResult.status).toBe(200);
        expect(getResult.body).toEqual(
            expect.arrayContaining([{
                id: expect.any(Number),
                name: expect.any(String),
                price: expect.any(Number)
            }])
        )
    }) 
})

describe('Test api fruits: GET /fruits/:id', () => {
    it('Get correct object expecting status 200: OK', async () =>{
        const result = await supertest(app).post('/fruits').send({
            name: "banana",
            price: 25
        })
        const getResult = await supertest(app).get('/fruits/1')

        expect(getResult.status).toBe(200);
        expect(getResult.body).toEqual({
                id: 1,
                name: "banana",
                price: 25
            })
    }) 
    it('Get correct object expecting status 404: Not Found', async () =>{

        const getResult = await supertest(app).get('/fruits/4')
        expect(getResult.status).toBe(404);
    }) 
})

