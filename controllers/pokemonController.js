const csv = require("./../utils/csvOperations");
const { paginate } = require("./../utils/pagination");
const {
  validateSchema,
} = require("./../api/middlewares/validate-parameters-middleware");
const postPokemonSchema = require("./../utils/validators/schemas/pokemon-validator-schema.json");
const updatePokemonSchema = require("./../utils/validators/schemas/edit-pokemon-validtor-schema.json");
const {
  mappingPokemonProfile,
} = require("./../utils/mappers/new-pokemon-mapper");
const { NODE_ENV, FILE, FILE_TEST } = process.env;

const path = NODE_ENV === "test" ? FILE_TEST : FILE;

exports.checkRequests = (req, res, next) => {
  const selectedSchema =
    req.method == "POST" ? postPokemonSchema : updatePokemonSchema;
  const isValid = validateSchema(req.body, selectedSchema);
  if (isValid !== true) {
    return res.status(400).json({
      message: isValid,
    });
  }
  next();
};

exports.getAllPokemons = async (req, res) => {
  try {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.pageSize);
    let pokemonList = await csv.readCSV(path);
    let total = pokemonList.length;

    if (total === 0) {
      return res.status(404).json({
        status: "success",
        total,
        results: pokemonList,
        requestedAt: req.requestTime,
      });
    }
    if (page && pageSize) {
      const paginetedList = await paginate(pokemonList, page, pageSize);
      pokemonList = paginetedList;
      total = pokemonList.length;
    }

    res.status(200).json({
      status: "success",
      total,
      results: pokemonList,
      requestedAt: req.requestTime,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      message: err,
    });
  }
};

exports.createPokemon = async (req, res) => {
  try {
    const body = req.body;
    const resultsResponse = await csv.readCSV(path);
    let newPokemonId;
    if (resultsResponse.length) {
      const uniquedIds = [
        ...new Set(resultsResponse.map((pokemon) => pokemon["#"])),
      ];
      const pokemonId = Math.max(...uniquedIds) + 1;
      newPokemonId = pokemonId;
    }
    let pokemonProfile = [
      {
        "#": newPokemonId || 1,
        Name: body.name,
        "Type 1": body.typeOne,
        "Type 2": body.typeTwo,
        Total: body.total,
        HP: body.hp,
        Attack: body.attack,
        Defense: body.defense,
        "Sp. Atk": body.spAtk,
        "Sp. Def": body.spDef,
        Speed: body.speed,
        Generation: body.generation,
        Legendary: body.legendary,
      },
    ];

    let newPokemon = resultsResponse.length
      ? [...resultsResponse, ...pokemonProfile]
      : pokemonProfile;
    const results = await csv.addDataToCSV("pokemon.csv", newPokemon);
    res.status(201).json({
      status: "success",
      total: results.length,
      data: {
        pokemon: results,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      message: "Invalid data",
    });
  }
};

exports.updatePokemon = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const readCSVResponse = await csv.readCSV(path);

    const pokemonId = readCSVResponse.findIndex((e) => e["#"] == id);
    if (pokemonId !== -1) {
      let pokemonProfile = await mappingPokemonProfile(
        pokemonId,
        readCSVResponse,
        body
      );
      readCSVResponse[pokemonId] = pokemonProfile;

      const payload = readCSVResponse;
      const results = await csv.addDataToCSV("pokemon.csv", payload);
      return res.status(200).json({
        status: "success",
        total: results.length,
        data: {
          pokemon: results,
        },
      });
    }
    res.status(404).json({
      status: false,
      error: "Pokemon not found",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: "Invalid data",
    });
  }
};

exports.deletePokemon = async (req, res) => {
  try {
    const id = req.params.id;

    const readCSVResponse = await csv.readCSV(path);

    const pokemonId = readCSVResponse.findIndex((e) => e["#"] == id);
    if (pokemonId !== -1) {
      const updatedPokemos = readCSVResponse.filter((e) => e["#"] != id);
      const payload = updatedPokemos;
      const results = await csv.addDataToCSV("pokemon.csv", payload);
      return res.status(200).json({
        status: "success",
        total: results.length,
        data: {
          pokemon: results,
        },
      });
    }
    res.status(404).json({
      status: false,
      error: "Pokemon not found",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      message: "Invalid data",
    });
  }
};
