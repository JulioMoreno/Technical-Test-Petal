const csv = require("../../utils/csvOperations");
const supertest = require("supertest");
const { app, server } = require("../../server");
const api = supertest(app);

describe("Tests to delete pokemons", () => {
  beforeEach(async () => {
    jest.resetAllMocks();
  });
  test("When inputs are valid. Expect to delete the pokemon selected wiht the id 4", async () => {
    const id = 4;
    const pokemones = [
      {
        "#": "4",
        Name: "Pokemon CA",
        "Type 1": "D",
        "Type 2": "A",
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
      {
        "#": "5",
        Name: "Pokemon MX",
        "Type 1": "D",
        "Type 2": "A",
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
      status: "success",
      total: 1,
      data: {
        pokemon: [
          {
            "#": "5",
            Name: "Pokemon MX",
            "Type 1": "D",
            "Type 2": "A",
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
    jest.spyOn(csv, "readCSV").mockImplementation(() => pokemones);
    jest
      .spyOn(csv, "addDataToCSV")
      .mockImplementation(() => expectedResponse.data.pokemon);
    const response = await api.delete(`/api/v1/pokemons/${id}`);
    expect(response).toHaveProperty("body");
    expect(response).toHaveProperty("statusCode", 200);
    expect(response.body).toMatchObject(expectedResponse);
  });
  test("When the pokemon id does not exist. Expect to receive an error (404 - Not found)", async () => {
    const id = 444;
    const pokemones = [];
    const expectedResponse = {
      status: false,
      error: "Pokemon not found",
    };
    jest.spyOn(csv, "readCSV").mockImplementation(() => pokemones);
    jest
      .spyOn(csv, "addDataToCSV")
      .mockImplementation(() => expectedResponse.data.pokemon);
    const response = await api.delete(`/api/v1/pokemons/${id}`);
    expect(response).toHaveProperty("body");
    expect(response).toHaveProperty("statusCode", 404);
    expect(response.body).toMatchObject(expectedResponse);
  });
  test("When the pokemon id is a string. Expect to receive an error (404 - Not found)", async () => {
    const id = "Test";
    const pokemones = [];
    const expectedResponse = {
      status: false,
      error: "Pokemon not found",
    };
    jest.spyOn(csv, "readCSV").mockImplementation(() => pokemones);
    jest
      .spyOn(csv, "addDataToCSV")
      .mockImplementation(() => expectedResponse.data.pokemon);
    const response = await api.delete(`/api/v1/pokemons/${id}`);
    expect(response).toHaveProperty("body");
    expect(response).toHaveProperty("statusCode", 404);
    expect(response.body).toMatchObject(expectedResponse);
  });
});


afterAll(() => {
  server.close();
});
