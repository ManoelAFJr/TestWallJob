const request = require("supertest");
import { app } from "../app";

jest.mock("../Controller/userController.js", () => ({
  registerUser: jest
    .fn(async (userData) => {
      return true;
    })
    .mockImplementationOnce(async (userData) => {
      return false;
    }),
}));

var Mongoose = require("mongoose").Mongoose;
var mongoose = new Mongoose();

var MockMongoose = require("mock-mongoose").MockMongoose;
var mockMongoose = new MockMongoose(mongoose);

describe("Test for register", () => {
  test("Não permite cadastro de usuário com email já existente", async () => {
    await request(app)
      .post("/register")
      .send({
        firstname: "Teste",
        lastname: "router",
        email: "mjr@gmail.com",
        password: "123456",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({ error: "User already exists" });
      });
  });
  test("Permite cadastro de usuário com email não existente", async () => {
    await request(app)
      .post("/register")
      .send({
        firstname: "Teste",
        lastname: "router",
        email: "mjr@gmail.com",
        password: "123456",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ user: true });
      });
  });
});


