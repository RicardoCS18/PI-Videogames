import { FILTER, ORDER, SET_VIDEOGAMES, SET_GENRES } from "./actionTypes"

export function setGames(allVideogames){
    return {type:SET_VIDEOGAMES, payload:allVideogames}
}
export function filterGames(filterCommands) {
    return { type: FILTER, payload: filterCommands}
}
export function orderGames(order) {
    return { type: ORDER, payload: order}
}
export function setGenres(allGenres){
    return {type:SET_GENRES, payload:allGenres}
}