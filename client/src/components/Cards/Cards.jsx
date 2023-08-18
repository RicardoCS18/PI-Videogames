import Card from "../Card/Card"
import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { filterGames, orderGames, setGenres, setGames } from "../../redux/actions"
import loaderGif from '../../assets/squareLoader.gif';
import style from "./Cards.module.css"


//Cards
const Cards = ()=> {

    const dispatch = useDispatch();
    const genres = useSelector(state => state.allGenres)
    const videogames = useSelector(state => state.modifiedVideogames)

    const [showOptions, setShowOptions] = useState({FilterByGenre: false,FilterByOrigin:false, Order:false})
    const [filters, setFilters] = useState({genre:[], origin:["All"]})
    const [order, setOrder] = useState("")    
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    

    const videogamesPerPage = 15;
    const lastItemIndex = currentPage * videogamesPerPage;
    const firstItemIndex = lastItemIndex - videogamesPerPage;
    const currentVideogames = videogames.slice(firstItemIndex, lastItemIndex);
    const totalPages = Math.ceil(videogames.length/videogamesPerPage);
    const pagesToRender = []
    for(let i=1; i<=totalPages;i++){
        pagesToRender.push(i);
    }

    useEffect(() => {
        axios.get("http://localhost:3001/videogames").then(response => {
      dispatch(setGames(response.data));
      setIsLoading(false) 
    }).catch(e=>{console.log(e); })
        if (genres.length===0)
        {axios.get("http://localhost:3001/genres")
            .then(({ data }) =>{dispatch(setGenres(data));}) 
            .catch((error) => window.alert(error.message));
            console.log("fetching genres")}  
        dispatch(filterGames({filter: "origin", options:["All"], order:order!==""?order:"none"}))
        return () => {
            dispatch(filterGames({ filter: "genre", options: [], order:order!==""?order:"none" }));
            dispatch(filterGames({ filter: "origin", options: ["All"], order:order!==""?order:"none"}));
        }; 
    }, []);

    const displaying = (e) => {
        const {name} = e.target
        setShowOptions({...showOptions, [name]: !showOptions[name] })
    }

    const filterHandler = (e) => {
        const {checked, value, name} = e.target;
        
        if(checked) {setFilters({...filters,[name]:[...filters[name],value]})
            dispatch(filterGames({filter: name, options: [...filters[name], value], order: order!==""?order:"none"}))}
        else {
            setFilters({...filters, [name]: filters[name].filter(filt => filt!==value)})
            dispatch(filterGames({filter: name , options: filters[name].filter(filt => filt!==value), order: order!==""?order:"none"}))
        }
        setCurrentPage(1);
        
    }

    const orderHandler = (e) => {
        const {value} = e.target
        setOrder(value)
        dispatch(orderGames(value))
        setCurrentPage(1);
    }

    return(
        <div>
      {isLoading ? (
        <div className={style.loader}>
          <img src={loaderGif} alt="Loading" />
        </div>
      ) : (
        <div className={style.container}>
        <button className={style.options} onClick={displaying} name="FilterByGenre">Filter by Genre</button> 
        {showOptions.FilterByGenre && 
        <div className={style.checkContainer}>
        {genres.map((genre) => (
                <label key={genre.id} 
                
                className={`${filters.genre.includes(genre.name)? style.checked : style.check}`}
                >
                <input
                
                    type="checkbox"
                    name="genre"
                    value={genre.name}
                    onChange={filterHandler}
                />
                {genre.name}
                </label>
            ))
        }
        </div>
        }
        <button className={style.options} onClick={displaying} name="FilterByOrigin">Filter by Origin</button> 
        {showOptions.FilterByOrigin &&
        <div className={style.checkContainer}>
            <label 
            //className={style.check}
            className={`${filters.origin[filters.origin.length-1]==="All"? style.checked : style.check}`}
            >
                <input
                    type="radio"
                    name="origin"
                    value="All"
                    checked={filters.origin[filters.origin.length-1]==="All"}
                    onChange={filterHandler}
                />
                All
            </label>
            <label 
            
            className={`${filters.origin[filters.origin.length-1]==="DB"? style.checked : style.check}`}
            >
                <input
                    type="radio"
                    name="origin"
                    value="DB"
                    checked={filters.origin[filters.origin.length-1]==="DB"}
                    onChange={filterHandler}
                />
                DB
            </label>
            <label 
            className={`${filters.origin[filters.origin.length-1]==="API"? style.checked : style.check}`}
            >
                <input
                    type="radio"
                    name="origin"
                    value="API"
                    checked={filters.origin[filters.origin.length-1]==="API"}
                    onChange={filterHandler}
                />
                API
            </label>
        </div>
        }
        <button className={style.options} onClick={displaying} name="Order">Order</button>
        {showOptions.Order && 
        <div className={style.checkContainer}>
            <label 
            className={`${order==="ascendingRating"? style.checked : style.check}`}
            >
                <input
                    type="radio"
                    name="order"
                    value="ascendingRating"
                    onClick={orderHandler}

                />
                Ascending Rating
            </label>
            <label 
            className={`${order==="descendingRating"? style.checked : style.check}`}
            >
                <input
                    type="radio"
                    name="order"
                    value="descendingRating"
                    onClick={orderHandler}

                />
                Descending Rating
            </label>
            <label 
            className={`${order==="ascendingName"? style.checked : style.check}`}
            >
                <input
                    type="radio"
                    name="order"
                    value="ascendingName"
                    onClick={orderHandler}

                />
                A-Z
            </label>
            <label 
            className={`${order==="descendingName"? style.checked : style.check}`}
            >
                <input
                    type="radio"
                    name="order"
                    value="descendingName"
                    onClick={orderHandler}

                />
                Z-A
            </label>
        </div>
        } 
        <div
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // 4 columns
            gridGap: "20px",
            textAlign: "center",
            padding: "20px",
          }}
        >
        {currentVideogames.map(card => 
        <Card 
        key={card.id} 
        id ={card.id} 
        name={card.name} 
        image={card.image} 
        platforms={card.platforms} 
        genres={card.genres} 
        rating={card.rating}/>)}
        </div>
        <div>
        <button
            className={`${style.nextPageButton} ${currentPage === 1 ? style.disabledButton : ''}`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <>
        {pagesToRender.map(page=>(
        <button
        className={`${style.pageButton} ${currentPage === page ? style.disabledButton : ''}`}
            key={page}
            onClick={()=> setCurrentPage(page)}
            disabled={page === currentPage}
        >
            {page}
        </button>))}
        </>
        <button
          className={`${style.nextPageButton} ${lastItemIndex >= videogames.length ? style.disabledButton : ''}`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={lastItemIndex >= videogames.length}
        >
          Next Page
        </button>
      </div>
        
        </div>
        )}
        </div>
    )
}
export default Cards 