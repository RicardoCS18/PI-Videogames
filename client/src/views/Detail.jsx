import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import loaderGif from "../assets/squareLoader.gif";
import axios from "axios";

const Detail = () => {
  const [videogame, setVideogame] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;

    axios
      .get(`http://localhost:3001/videogames/${id}`)
      .then(({ data }) => {
        if (isMounted && data.name) {
          setVideogame(data);
          setIsLoading(false);
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
      {isLoading ? (
        <div className="loader">
          <img src={loaderGif} alt="Loading" />
        </div>
      ) : (
        <div style={{ width: '1000px', background: "lightgray", margin: 100 }}>
          <br />
          <h2> ID : {videogame.id}</h2>
          <h3>{videogame.name}</h3>
          <br />
          <img src={videogame.image} width="500px" alt="videogame" />
          <br />
          <h3>Genres:</h3>
          <h3>
            {videogame.genres &&
              videogame.genres.map((el) => (
                <span key={el.id}>{el.name + " "}</span>
              ))}
          </h3>
          <br />
          <h3>Description:</h3>
          <div
            style={{
              overflow: "auto",
              maxHeight: "500px", 
              padding: "50px",
            }}
            dangerouslySetInnerHTML={{
              __html: videogame.description,
            }}
          ></div>
          <br />
          <h3>Release Date:</h3>
          <h3>{videogame.released}</h3>
          <br />
          <h3>Rating:</h3>
          <h3>{videogame.rating}</h3>
          <br />
          <h3>Platforms:</h3>
          <div style={{ marginBottom: "20px" }}>
            {videogame.platforms  &&
              videogame.platforms.map((el) => (
                <div key={el.platform.id}>{el.platform.name}</div>
              ))}
            </div>
            <br />
        </div>
      )}
    </div>
  );
};

export default Detail;




