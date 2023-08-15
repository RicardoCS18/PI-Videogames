import { FILTER, SET_GENRES, ORDER, SET_VIDEOGAMES } from "./actionTypes"

const initialState = {
    allVideogames: [],
    allGenres:[],
    modifiedVideogames:[],
    genres:[],
    origin:["All"],
}

const filterOptions = {
    genre: (total, genres) => 
        total.filter(videogame => {
            const gameGenres = new Set(videogame.genres.map(gen => gen.name));
            return genres.every(genre => gameGenres.has(genre));
        }
    )
    ,
    origin: (total, origin) => {
        if (origin[origin.length-1]==="All") return total;
        else if(origin[origin.length-1]==="DB") return total.filter(videogame=> !/^\d+$/.test(videogame.id))
        else if(origin[origin.length-1]==="API") return total.filter(videogame=>/^\d+$/.test(videogame.id))
    }
}
const orderOptions = {
    none: (total) => {return total},
    ascendingRating: (total) => total.sort((a, b) => a.rating - b.rating),
    descendingRating: (total) => total.sort((a, b) => b.rating - a.rating),
    ascendingName: (total) => total.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })),
    descendingName: (total) => total.sort((a, b) => b.name.localeCompare(a.name, undefined, { sensitivity: 'base' })),
}

export default function rootReducer (state= initialState, {type, payload}) {
    
    switch(type){

        case SET_VIDEOGAMES:

            return {...state, allVideogames:[...payload], modifiedVideogames:[...payload]}

        case FILTER:

            let genres = payload.filter === "genre" ? payload.options : state.genres
            if(payload.filter==="origin" && payload.options.length>1) payload.options = [payload.options[payload.options.length-1]]
            let origin = payload.filter === "origin" ? payload.options : state.origin

            return {
                ...state,  
                genres, 
                origin, 
                modifiedVideogames: orderOptions[payload.order]([...filterOptions.genre(filterOptions.origin(state.allVideogames,origin), genres)]),
            } 

        case ORDER:

            let ordered = orderOptions[payload](state.modifiedVideogames)

            return {...state, modifiedVideogames:ordered} 

        case SET_GENRES:
            
            return {...state, allGenres:[...payload]}

        default: 
        
            return {...state}
    }
}