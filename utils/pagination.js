exports.paginate = async (pokemonData, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  const result = pokemonData.slice(startIndex, endIndex);
  return result;
};
