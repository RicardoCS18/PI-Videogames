import { NavLink } from "react-router-dom"
import style from "./Card.module.css"

const Card = ({id, name, image, genres})=> {
    
    if(image===null){
        image = "https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
    }
    return(
        <NavLink to={`/detail/${id}`} className={style.nameLink}>
        <div 
        className={style.cardContainer}
        //className={style.cardContainer}
    //     style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     textAlign: "center",
    //     width:"33%",
    //     height:"400px"
    //   }}
      >
         
        
        <img  src={image} className={style.image} width="100" height="100" alt="videogame" />
        <h2 className={style.name}>{name}</h2>
        <h3 >{genres && genres.map((genre) =>(<span className={style.genre} key={genre.id}>{genre.name + " "}</span>))}</h3>
        
        </div>
        </NavLink>
    )
}
export default Card 

