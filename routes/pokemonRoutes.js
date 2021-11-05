const express = require('express');
const pokemonController = require('./../controllers/pokemonController');
const router = express.Router();

router.route('/')
.get(pokemonController.getAllPokemons)
.post(pokemonController.checkRequests, pokemonController.createPokemon);

router.route('/:id')
.patch(pokemonController.checkRequests, pokemonController.updatePokemon)
.delete(pokemonController.deletePokemon);

module.exports = router;