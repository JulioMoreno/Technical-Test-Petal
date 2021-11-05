const csv = require("../../utils/csvOperations");
const supertest = require("supertest");
const { app, server } = require("../../server");
const api = supertest(app);
//jest.mock("../utils/csvOperations");

describe("Tests to get the list of pokemons", () => {
  const initialPokemon = [
    {
      "#": "1",
      Name: "Julio Test",
      "Type 1": ":D",
      "Type 2": "Hola",
      Total: "318",
      HP: "45",
      Attack: "99",
      Defense: "49",
      "Sp. Atk": "65",
      "Sp. Def": "65",
      Speed: "45",
      Generation: "1",
      Legendary: "False",
    },
  ];
  beforeEach(async () => {
    jest.resetAllMocks();
  });
  const expectedResponse = {
    results: [
      {
        "#": "1",
        Attack: "99",
        Defense: "49",
        Generation: "1",
        HP: "45",
        Legendary: "False",
        Name: "Julio Test",
        "Sp. Atk": "65",
        "Sp. Def": "65",
        Speed: "45",
        Total: "318",
        "Type 1": ":D",
        "Type 2": "Hola",
      },
    ],
    status: "success",
    total: 1,
  };
  test("When inputs are valid. Expect to get the pokemon list", async () => {
    jest.spyOn(csv, "readCSV").mockImplementation(() => initialPokemon);
    const response = await api.get("/api/v1/pokemons");
    expect(response).toHaveProperty("body");
    expect(response).toHaveProperty("statusCode", 200);
    expect(response.body).toMatchObject(expectedResponse);
  });
  test("When there is no records. Expect not receive the list of pokemons (404 - Not found)", async () => {
    //csv.readCSV = jest.fn(() => 'Holaaaaaa');
    jest.spyOn(csv, "readCSV").mockImplementation(() => []);
    const expectedResponse = {
      status: "success",
      total: 0,
      results: [],
    };
    const response = await api.get("/api/v1/pokemons");
    expect(response).toHaveProperty("body");
    expect(response).toHaveProperty("statusCode", 404);
    expect(response.body).toMatchObject(expectedResponse);
  });
  test("When page & pageSize is received by query string. Expect to get the pokemon list", async () => {
    //csv.readCSV = jest.fn(() => 'Holaaaaaa');
    const expectedResponsePagination = {
      results: [
        {
          "#": "1",
          Attack: "99",
          Defense: "49",
          Generation: "1",
          HP: "45",
          Legendary: "False",
          Name: "Julio Test",
          "Sp. Atk": "65",
          "Sp. Def": "65",
          Speed: "45",
          Total: "318",
          "Type 1": ":D",
          "Type 2": "Hola",
        },
      ],
      status: "success",
      total: 1,
    };
    jest
      .spyOn(csv, "readCSV")
      .mockImplementation(() => expectedResponsePagination.results);
    const response = await api
      .get("/api/v1/pokemons")
      .query({ page: "1", pageSize: "1" });
    expect(response).toHaveProperty("body");
    expect(response).toHaveProperty("statusCode", 200);
    expect(response.body).toMatchObject(expectedResponsePagination);
  });
  test("When page & pageSize is received by query string but there are no records. Expect not receive the list of pokemons (404 - Not found)", async () => {
    //csv.readCSV = jest.fn(() => 'Holaaaaaa');
    const expectedResponsePagination = {
      results: [],
      status: "success",
      total: 0,
    };
    jest.spyOn(csv, "readCSV").mockImplementation(() => []);
    const response = await api
      .get("/api/v1/pokemons")
      .query({ page: "10", pageSize: "100" });
    expect(response).toHaveProperty("body");
    expect(response).toHaveProperty("statusCode", 404);
    expect(response.body).toMatchObject(expectedResponsePagination);
  });
  test("When a query string to paginate is incorrect. Expect to get the pokemon list", async () => {
    //csv.readCSV = jest.fn(() => 'Holaaaaaa');
    const expectedResponsePagination = {
      results: [
        {
          "#": "1",
          Attack: "99",
          Defense: "49",
          Generation: "1",
          HP: "45",
          Legendary: "False",
          Name: "Julio Test",
          "Sp. Atk": "65",
          "Sp. Def": "65",
          Speed: "45",
          Total: "318",
          "Type 1": ":D",
          "Type 2": "Hola",
        },
      ],
      status: "success",
      total: 1,
    };
    jest
      .spyOn(csv, "readCSV")
      .mockImplementation(() => expectedResponsePagination.results);
    const response = await api
      .get("/api/v1/pokemons")
      .query({ pageTest: "10", pageSize: "100" });
    expect(response).toHaveProperty("body");
    expect(response).toHaveProperty("statusCode", 200);
    expect(response.body).toMatchObject(expectedResponsePagination);
  });
});

afterAll(() => {
  server.close();
});
