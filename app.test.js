const request = require("supertest"); // supertest simula chamada a propria api
const app = require("./app.js");

// TDD:
// 1. Write tests.
// 2. Implement until tests passing.
// 3. Refactor, improve code, write more tests.
// 4. E vai repetindo esse ciclo... o resultado é software funcionando com cobertura de teste.

// Aqui primeiramente os testes foram descritos, em seguida implementados.
// Ainda não tem implementação da API de todos.


describe("Todos API tests", () => {
  it("should return an array of todos", () => {
    return request(app)
      .get("/todos")
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              completed: expect.any(Boolean)
            })
          ])
        );
      });
  });

  it("should return an specific todo by id", () => {
    return request(app)
      .get("/todos/1")
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            completed: expect.any(Boolean)
          })
        );
      });
  });

  it("should return 404 if didn't find specific todo", () => {
    return request(app).get("/todos/9999999").expect(404);
  });

  it("should return a newly created todo", () => {
    return request(app)
      .post("/todos").send({
        name: "do dishes"
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then(res => {
        expect(res.body).toEqual(
          expect.objectContaining({
            name: "do dishes",
            completed: false
          })
        );
      });
  });

  it("validates a request body for todo creation", () => {
    return request(app).post("/todos").send({ name: 123 }).expect(422);
  });
});