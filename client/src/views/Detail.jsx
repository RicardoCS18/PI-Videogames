import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const Detail = () => {
    const [videogame, setVideogame] = useState([]);
    const {id} = useParams();
    useEffect(() => {
      let isMounted = true;

      axios.get(`http://localhost:3001/videogames/${id}`)
          .then(({ data }) => {
              if (isMounted && data.name) {
                  setVideogame(data);
              }
          })
          .catch((error) => {
              if (isMounted) {
                  window.alert("There is no videogame with that ID");
              }
          });

      return () => {
          isMounted = false; 
      };
  }, [id]);
    return ( 
    <div>
        <h2>{videogame.id}</h2>
        <h3>{videogame.name}</h3>
        <img src={videogame.image} alt="videogame" />
        <h3>{videogame.genres && videogame.genres.map((el)=>(<span key={el.id}>{el.name+ " "}</span>))}</h3>
        <div dangerouslySetInnerHTML={{
          __html: videogame.description
        }}></div>
        <h3>{videogame.released}</h3>
        <h3>{videogame.rating}</h3>
        <h3>{videogame.platforms 
        && videogame.platforms.map((el) => (
          <span key={el.platform.id}>{el.platform.name + " "}</span>
        ))
        }</h3>
    </div>)
}
export default Detail



