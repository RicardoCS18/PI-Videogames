import { NavLink } from "react-router-dom"
const Card = ({id, name, image, genres})=> {
    if(image===null){
        image = "https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
    }
    return(
        
        <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width:"33%",
        height:"400px"
      }}>
        <NavLink to={`/detail/${id}`}><h2>{name}</h2></NavLink>
        <h3>{genres && genres.map((genre) =>(<span key={genre.id}>{genre.name + " "}</span>))}</h3>
        <img src={image } width="200" height="100" alt="videogame" />
        </div>
    )
}
export default Card 

