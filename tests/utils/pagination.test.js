const { paginate } = require("../../utils/pagination");

describe("Tests to pagination", () => {
  test("When is sent an array to paginate with page 2 and pageSize 1. Expect to get the correct data with one item", async () => {
    const page = 2;
    const pageSize = 1;
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
      {
        "#": "6",
        Name: "Pokemon USA",
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
    const expectedResponse = [
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
    const response = await paginate(pokemones, page, pageSize);
    expect(response).toMatchObject(expectedResponse);
  });
  test("When is sent an array to paginate with page 0 and pageSize 0. Expect not receive data", async () => {
    const page = 0;
    const pageSize = 0;
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
      {
        "#": "6",
        Name: "Pokemon USA",
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
    const expectedResponse = [];
    const response = await paginate(pokemones, page, pageSize);
    expect(response).toMatchObject(expectedResponse);
  });
  test("When is sent an array to paginate with page 1 and pageSize 3. Expect to get the correct data with all the items", async () => {
    const page = 1;
    const pageSize = 3;
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
      {
        "#": "6",
        Name: "Pokemon USA",
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
    const expectedResponse = [
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
      {
        "#": "6",
        Name: "Pokemon USA",
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
    const response = await paginate(pokemones, page, pageSize);
    expect(response).toMatchObject(expectedResponse);
  });
});
