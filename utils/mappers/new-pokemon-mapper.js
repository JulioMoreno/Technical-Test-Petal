exports.mappingPokemonProfile = async (pokemonId, pokemonData, payload) => {
  const mappedPokemonData = {
    "#": pokemonData[pokemonId]["#"],
    Name: payload.name || pokemonData[pokemonId]["Name"],
    "Type 1": payload.typeOne || pokemonData[pokemonId]["Type 1"],
    "Type 2": payload.typeTwo || pokemonData[pokemonId]["Type 2"],
    Total: payload.total || pokemonData[pokemonId]["Total"],
    HP: payload.hp || pokemonData[pokemonId]["HP"],
    Attack: payload.attack || pokemonData[pokemonId]["Attack"],
    Defense: payload.defense || pokemonData[pokemonId]["Defense"],
    "Sp. Atk": payload.spAtk || pokemonData[pokemonId]["Sp. Atk"],
    "Sp. Def": payload.spDef || pokemonData[pokemonId]["Sp. Def"],
    Speed: payload.speed || pokemonData[pokemonId]["Speed"],
    Generation: payload.generation || pokemonData[pokemonId]["Generation"],
    Legendary: payload.legendary || pokemonData[pokemonId]["Legendary"],
  };
  return mappedPokemonData;
};
