
const axios = require("axios")
require('dotenv').config();
const {API_KEY, API_URL_GAMES, API_URL_GENRES} = process.env;
const { Genre, Videogame } = require('../db')
const {Op} = require("sequelize");

 const getAllVideogames = async (req, res) => {
     try {
        const videogames= [];

        const gamesDB = await Videogame.findAll({
            include: [{ model: Genre, through: { attributes: [] } }]
        });

        videogames.push(...gamesDB);
        

        let pages =[1,2,3,4,5,6,7,8,9,10]  // [1,2,3,4,5,6,7,8,9,10] [1,2,3,4,5]
        
        await Promise.all(pages.map(async (page)=>{ 
            
            const games = await axios.get(`${API_URL_GAMES}?key=${API_KEY}&page=${page}`)

            videogames.push(...games.data.results.map(el=>{ return {
                id:el.id,
                name:el.name,
                released: el.released,
                image:el.background_image,
                rating: el.rating,
                platforms:el.platforms.map(el=> el.platform.name),
                genres: el.genres.map(el=>{return {id:el.id, name:el.name}}),
         }}))
         }
         ))

        
        //       .map(game => {
        //       return {
        //           id: game.id,
        //           name: game.name,
        //           released: game.released,
        //           image: game.image,
        //           rating: game.rating,
        // // //         platforms: game.platforms.map(el => el.platform.name),
        //           genres: game.genres.map(el => { return { id: el.id, name: el.name } }),
        //       };
        //   })
        


         return res.status(200).json(videogames);
     } catch (error) {
        return res.status(401).json({message:error.message})
    }

 }



const getVideogameById = async (req, res) => {
    try {
        const {id} = req.params;

        if (/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(id)) {
            const videogameDB = await Videogame.findOne({
                where: { id },
                include: [{ model: Genre, through: { attributes: [] } }]
            });

        const videogame = { 
            id:  videogameDB.id,
            name:  videogameDB.name,
            image: videogameDB.image,
            platforms: [{platform: {id: 1, name: videogameDB.platforms}}],
            description: videogameDB.description,
            released: videogameDB.released,
            rating: videogameDB.rating,
            genres: videogameDB.genres            
        }
    
            return res.status(201).json(videogame);
        }       
        if(typeof +id === "number"){
            const videogameById = await axios.get(`${API_URL_GAMES}/${id}?key=${API_KEY}`)
            const videogame = {
                id:videogameById.data.id,
                name: videogameById.data.name,
                image: videogameById.data.background_image,
                platforms: videogameById.data.platforms,
                description: videogameById.data.description,
                released: videogameById.data.released,
                rating: videogameById.data.rating,
                genres: videogameById.data.genres.map(el=>{return {id:el.id, name:el.name}})
            }
        return res.status(200).json(videogame);
        }
        return res.status(200).json({message: "Please, enter a valid ID"})
    } catch (error) {
        return res.status(404).json({message:error.message})
    }

}

 const getVideogameByName = async (req, res) => {
    try {
        const {search} = req.query;
        if (!search) {
            throw new Error("Please enter a name");
            }
        const videogames = [];

        const searchingDB = await Videogame.findAll({
            where: { name: { [Op.iLike]: `%${search}%` } },
            limit: 15,
            include: [{model: Genre, through:{attributes: []}}] 
        });
        const searchingAPI = axios.get(`${API_URL_GAMES}?search=${search}&key=${API_KEY}`)
        .then(response => {
            if(response.data.count===0) {throw Error("There is no game with that name")}
            return response.data.results.filter(el => el.name.toLowerCase().includes(search.toLowerCase())).map(el=>{ return {
            id:el.id,
            name:el.name,
            image:el.background_image,
            rating: el.rating,
            platforms:el.platforms?el.platforms.map(el=> el.platform.name):[""],
            genres: el.genres.map(el=>{return {id:el.id, name:el.name}}),
        }})});

        const [videogamesDB,videogamesAPI] = await Promise.all([searchingDB,searchingAPI]);
        
        if (videogamesDB.length >= 1) {
            videogames.push(...videogamesDB);
        }

        if (videogamesAPI.length >= 1) { 
            videogames.push(...videogamesAPI);
        }
            
        if(videogames.length<1) throw Error("There is no game with that name");

        return res.status(200).json(videogames.slice(0,15));
       
     } catch (error) {

        return res.status(400).json({message:error.message})
     }

   
 }



const createVideogameEntry = async (req, res) => {
    try {
        const {name, description, platforms, image, released, rating, genre} = req.body;
        //faltan validaciones
        const videogame = await Videogame.create({name,description,platforms,image,released,rating})
        videogame.setGenres(genre);
        return res.status(200).json({videogame, genre})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

const showGenres = async (req, res)=> {
    try {
        
        const storeGenres = async () => {let  genrePromiseApi = await axios.get(`${API_URL_GENRES}?key=${API_KEY}`)
            const { data } = genrePromiseApi
            await Promise.all( data.results.map(async (genre) => (
                await Genre.create({
                    id: genre.id,
                    name: genre.name,
                })
            )))}
    let actualDB = await Genre.findAll();
    if(actualDB.length < 1) { await storeGenres();}
        const genres = await Genre.findAll();
        return res.status(200).json(genres)
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

module.exports = {
    getAllVideogames, getVideogameById, getVideogameByName, createVideogameEntry, showGenres
}