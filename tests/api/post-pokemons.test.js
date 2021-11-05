const csv = require("../../utils/csvOperations");
const supertest = require("supertest");
const { app, server } = require("../../server");
const api = supertest(app);

describe("Tests to create pokemons", () => {
  beforeEach(async () => {
    jest.resetAllMocks();
  });
  test("When inputs are valid. Expect to create a pokemon", async () => {
    const payload = {
      name: "Julio Test",
      typeOne: "One",
      typeTwo: "Two",
      total: 318,
      hp: 45,
      attack: 99,
      defense: 49,
      spAtk: 65,
      spDef: 65,
      speed: 45,
      generation: 1,
      legendary: false,
    };
    const expectedResponse = {
      status: "success",
      data: {
        pokemon: {
          name: "Julio Test",
          typeOne: "One",
          typeTwo: "Two",
          total: 318,
          hp: 45,
          attack: 99,
          defense: 49,
          spAtk: 65,
          spDef: 65,
          speed: 45,
          generation: 1,
          legendary: false,
        },
      },
    };
    jest.spyOn(csv, "addDataToCSV").mockImplementation(() => payload);
    const response = await api.post("/api/v1/pokemons").send(payload);
    expect(response).toHaveProperty("body");
    expect(response).toHaveProperty("statusCode", 201);
    expect(response.body).toMatchObject(expectedResponse);
  });
  test("When name property is a number. Expect to receive an error (400 - Bad Request)", async () => {
    const payload = {
      name: 1,
      typeOne: "One",
      typeTwo: "Two",
      total: 318,
      hp: 45,
      attack: 99,
      defense: 49,
      spAtk: 65,
      spDef: 65,
      speed: 45,
      generation: 1,
      legendary: false,
    };
    const expectedResponse = {
      message: {
        status: "failed",
        errors: [
          {
            path: "/name",
            message: "must be string",
          },
        ],
      },
    };
    jest.spyOn(csv, "addDataToCSV").mockImplementation(() => payload);
    const response = await api.post("/api/v1/pokemons").send(payload);
    expect(response).toHaveProperty("body");
    expect(response).toHaveProperty("statusCode", 400);
    expect(response.body).toMatchObject(expectedResponse);
  });
  test("When total property is a boolean. Expect to receive an error (400 - Bad Request)", async () => {
    const payload = {
      name: "Julio",
      typeOne: "One",
      typeTwo: "Two",
      total: true,
      hp: 45,
      attack: 99,
      defense: 49,
      spAtk: 65,
      spDef: 65,
      speed: 45,
      generation: 1,
      legendary: false,
    };
    const expectedResponse = {
      message: {
        status: "failed",
        errors: [
          {
            path: "/total",
            message: "must be number",
          },
        ],
      },
    };
    jest.spyOn(csv, "addDataToCSV").mockImplementation(() => payload);
    const response = await api.post("/api/v1/pokemons").send(payload);
    expect(response).toHaveProperty("body");
    expect(response).toHaveProperty("statusCode", 400);
    expect(response.body).toMatchObject(expectedResponse);
  });
  test("When legendary property is a number. Expect to receive an error (400 - Bad Request)", async () => {
    const payload = {
      name: "Julio",
      typeOne: "One",
      typeTwo: "Two",
      total: 32,
      hp: 45,
      attack: 99,
      defense: 49,
      spAtk: 65,
      spDef: 65,
      speed: 45,
      generation: 1,
      legendary: 5,
    };
    const expectedResponse = {
      message: {
        status: "failed",
        errors: [
          {
            path: "/legendary",
            message: "must be boolean",
          },
        ],
      },
    };
    jest.spyOn(csv, "addDataToCSV").mockImplementation(() => payload);
    const response = await api.post("/api/v1/pokemons").send(payload);
    expect(response).toHaveProperty("body");
    expect(response).toHaveProperty("statusCode", 400);
    expect(response.body).toMatchObject(expectedResponse);
  });
  test("When name property is not provided. Expect to receive an error (400 - Bad Request)", async () => {
    const payload = {
      typeOne: "One",
      typeTwo: "Two",
      total: 32,
      hp: 45,
      attack: 99,
      defense: 49,
      spAtk: 65,
      spDef: 65,
      speed: 45,
      generation: 1,
      legendary: true,
    };
    const expectedResponse = {
      message: {
        status: "failed",
        errors: [
          {
            path: "name",
            message: "must have required property 'name'",
          },
        ],
      },
    };
    jest.spyOn(csv, "addDataToCSV").mockImplementation(() => payload);
    const response = await api.post("/api/v1/pokemons").send(payload);
    expect(response).toHaveProperty("body");
    expect(response).toHaveProperty("statusCode", 400);
    expect(response.body).toMatchObject(expectedResponse);
  });
});

afterAll(() => {
  server.close();
});
