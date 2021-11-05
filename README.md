# Technical-Test-Petal

📦Technical Test
 ┣ 📂api
 ┃ ┗ 📂middlewares
 ┃ ┃ ┗ 📜validate-parameters-middleware.js
 ┣ 📂controllers
 ┃ ┗ 📜pokemonController.js
 ┣ 📂routes
 ┃ ┗ 📜pokemonRoutes.js
 ┣ 📂tests
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📜delete-pokemons.test.js
 ┃ ┃ ┣ 📜get-all-pokemons.test.js
 ┃ ┃ ┣ 📜post-pokemons.test.js
 ┃ ┃ ┗ 📜update-pokemons.test.js
 ┃ ┗ 📂utils
 ┃ ┃ ┗ 📜pagination.test.js
 ┣ 📂utils
 ┃ ┣ 📂mappers
 ┃ ┃ ┗ 📜new-pokemon-mapper.js
 ┃ ┣ 📂validators
 ┃ ┃ ┗ 📂schemas
 ┃ ┃ ┃ ┣ 📜edit-pokemon-validtor-schema.json
 ┃ ┃ ┃ ┗ 📜pokemon-validator-schema.json
 ┃ ┣ 📜csvOperations.js
 ┃ ┗ 📜pagination.js
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜Technical Test - Petal.postman_collection.json
 ┣ 📜app.js
 ┣ 📜config.env
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜pokemon.csv
 ┗ 📜server.js

 ##Steps to run the project

You must install node js (At least the version 16.13.0 LTS) - [https://nodejs.org/es/](https://nodejs.org/es/).

Run the next commands in the root of the project with the terminal:

* cd Technical-Test-Petal
* npm install (To install all dependencies) 
* npm run dev

### `npm run dev`
This command will start the server to consume all the endpoints

### `npm run test`
This command will run all the unit tests

