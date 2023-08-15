const express = require('express')
const genresRouter = express.Router();
const {showGenres} = require("../RouteControllers/Controllers.js");





genresRouter.get("/", showGenres);

module.exports = genresRouter;