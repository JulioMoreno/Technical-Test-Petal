const csv = require("../../utils/csvOperations");
const supertest = require("supertest");
const { app, server } = require("../../server");
const api = supertest(app);

describe("Tests to update pokemons", () => {
  beforeEach(async () => {
    jest.resetAllMocks();
  });
  test("When inputs are valid. Expect to update the name property of the pokemon wiht the id 4", async () => {
    const id = 4;
    const payload = {
      name: "Pokemon Updated",
    };
    const expectedResponse = {
      status: "success",
      total: 1,
      data: {
        pokemon: [
          {
            "#": "4",
            Name: "Pokemon Updated",
            "Type 1": ":D",
            "Type 2": "",
            Total: "18",
            HP: "45",
            Attack: "3434",
            Defense: "49",
            "Sp. Atk": "65",
            "Sp. Def": "65",
            Speed: "45",
            Generation: "1",
            Legendary: "true",
          },
        ],
      },
    };
    jest
      .spyOn(csv, "readCSV")
      .mockImplementation(() => expectedResponse.data.pokemon);
    jest
      .spyOn(csv, "addDataToCSV")
      .mockImplementation(() => expectedResponse.data.pokemon);
    const response = await api.patch(`/api/v1/pokemons/${id}`).send(payload);
    expect(response).toHaveProperty("body");
    expect(response).toHaveProperty("statusCode", 200);
    expect(response.body).toMatchObject(expectedResponse);
  });
  test("When name property is a number. Expect to receive an error (400 - Bad Request)", async () => {
    const id = 4;
    const payload = {
      name: 10,
    };
    const pokemon = [
      {
        "#": "4",
        Name: "Pokemon Updated",
        "Type 1": ":D",
        "Type 2": "",
        Total: "18",
        HP: "45",
        Attack: "3434",
        Defense: "49",
        "Sp. Atk": "65",
        "Sp. Def": "65",
        Speed: "45",
        Generation: "1",
        Legendary: "true",
      },
    ];
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
    jest.spyOn(csv, "readCSV").mockImplementation(() => pokemon);
    jest
      .spyOn(csv, "addDataToCSV")
      .mockImplementation(() => expectedResponse.data.pokemon);
    const response = await api.patch(`/api/v1/pokemons/${id}`).send(payload);
    expect(response).toHaveProperty("body");
    expect(response).toHaveProperty("statusCode", 400);
    expect(response.body).toMatchObject(expectedResponse);
  });
  test("When attack property is a boolean. Expect to receive an error (400 - Bad Request)", async () => {
    const id = 4;
    const payload = {
      name: "Pokemon New",
      attack: false,
    };
    const pokemon = [
      {
        "#": "4",
        Name: "Pokemon Updated",
        "Type 1": ":D",
        "Type 2": "",
        Total: "18",
        HP: "45",
        Attack: "3434",
        Defense: "49",
        "Sp. Atk": "65",
        "Sp. Def": "65",
        Speed: "45",
        Generation: "1",
        Legendary: "true",
      },
    ];
    const expectedResponse = {
      message: {
        status: "failed",
        errors: [
          {
            path: "/attack",
            message: "must be number",
          },
        ],
      },
    };
    jest.spyOn(csv, "readCSV").mockImplementation(() => pokemon);
    jest
      .spyOn(csv, "addDataToCSV")
      .mockImplementation(() => expectedResponse.data.pokemon);
    const response = await api.patch(`/api/v1/pokemons/${id}`).send(payload);
    expect(response).toHaveProperty("body");
    expect(response).toHaveProperty("statusCode", 400);
    expect(response.body).toMatchObject(expectedResponse);
  });
  test("When the pokemon id does not exist. Expect to receive an error (404 - Not found)", async () => {
    const id = 467;
    const payload = {
      name: "Pokemon New",
      attack: 45,
    };
    const pokemon = [];
    const expectedResponse = {
      status: false,
      error: "Pokemon not found",
    };
    jest.spyOn(csv, "readCSV").mockImplementation(() => pokemon);
    jest
      .spyOn(csv, "addDataToCSV")
      .mockImplementation(() => expectedResponse.data.pokemon);
    const response = await api.patch(`/api/v1/pokemons/${id}`).send(payload);
    expect(response).toHaveProperty("body");
    expect(response).toHaveProperty("statusCode", 404);
    expect(response.body).toMatchObject(expectedResponse);
  });
});

afterAll(() => {
  server.close();
});
