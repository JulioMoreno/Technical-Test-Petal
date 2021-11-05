const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");

exports.readCSV = async (fileName) => {
  const promise = new Promise((resolve, reject) => {
    let results = [];
    fs.createReadStream(fileName)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
  return promise;
};
exports.addDataToCSV = async (fileName, pokemons) => {
  console.log("...pokemons", pokemons);
  const promise = new Promise((resolve, reject) => {
    const csvWriter = createCsvWriter({
      path: fileName,
      header: [
        { id: "#", title: "#" },
        { id: "Name", title: "Name" },
        { id: "Type 1", title: "Type 1" },
        { id: "Type 2", title: "Type 2" },
        { id: "Total", title: "Total" },
        { id: "HP", title: "HP" },
        { id: "Attack", title: "Attack" },
        { id: "Defense", title: "Defense" },
        { id: "Sp. Atk", title: "Sp. Atk" },
        { id: "Sp. Def", title: "Sp. Def" },
        { id: "Speed", title: "Speed" },
        { id: "Generation", title: "Generation" },
        { id: "Legendary", title: "Legendary" },
      ],
    });

    csvWriter
      .writeRecords(pokemons) // returns a promise
      .then(() => {
        console.log("...Done");
        resolve(pokemons);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return promise;
};
