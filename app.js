const express = require("express");
const morgan = require("morgan");
const pokemonRouter = require("./routes/pokemonRoutes");

const app = express();

//! Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/pokemons", pokemonRouter);
app.get("*", (req, res) => {
  res.send("PAGE NOT FOUND");
});

module.exports = app;
