const express = require('express')
const videogamesRouter = express.Router();
const {getAllVideogames, getVideogameById, getVideogameByName,createVideogameEntry} = require('../RouteControllers/Controllers.js')

videogamesRouter.get("/name",getVideogameByName);
videogamesRouter.get("/:id",getVideogameById);
videogamesRouter.get("/", getAllVideogames);

videogamesRouter.post("/",createVideogameEntry);

module.exports = videogamesRouter;