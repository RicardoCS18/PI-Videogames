import Card from "../Card/Card"
import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { filterGames, orderGames, setGenres } from "../../redux/actions"
import style from "./Cards.module.css"
//Cards
const Cards = (props)=> {

    const dispatch = useDispatch();
    const genres = useSelector(state => state.allGenres)

    const [showOptions, setShowOptions] = useState({FilterByGenre: false,FilterByOrigin:false, Order:false})
    const [filters, setFilters] = useState({genre:[], origin:["All"]})
    const [order, setOrder] = useState("")    
    const [currentPage, setCurrentPage] = useState(1);

    const videogamesPerPage = 15;
    const lastItemIndex = currentPage * videogamesPerPage;
    const firstItemIndex = lastItemIndex - videogamesPerPage;
    const currentVideogames = props.videogames.slice(firstItemIndex, lastItemIndex);
    const totalPages = Math.ceil(props.videogames.length/videogamesPerPage);
    const pagesToRender = []
    for(let i=1; i<=totalPages;i++){
        pagesToRender.push(i);
    }

    useEffect(() => {
        if (genres.length===0)
        {axios.get("http://localhost:3001/genres")
            .then(({ data }) => dispatch(setGenres(data))) // Set the genres state with fetched data
            .catch((error) => window.alert(error.message));
            console.log("fetching genres")}  //too many fetches for genre}
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
        <div className={style.container}>
        <button className={style.options} onClick={displaying} name="FilterByGenre">Filter by Genre</button> 
        {showOptions.FilterByGenre && 
        <div className={style.checkContainer}>
        {genres.map((genre) => (
                <label key={genre.id} className={style.check}>
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
            <label className={style.check}>
                <input
                    type="radio"
                    name="origin"
                    value="All"
                    checked={filters.origin[filters.origin.length-1]==="All"}
                    onChange={filterHandler}
                />
                All
            </label>
            <label className={style.check}>
                <input
                    type="radio"
                    name="origin"
                    value="DB"
                    checked={filters.origin[filters.origin.length-1]==="DB"}
                    onChange={filterHandler}
                />
                DB
            </label>
            <label className={style.check}>
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
            <label className={style.check}>
                <input
                    type="radio"
                    name="order"
                    value="ascendingRating"
                    onClick={orderHandler}

                />
                AscendingRating
            </label>
            <label className={style.check}>
                <input
                    type="radio"
                    name="order"
                    value="descendingRating"
                    onClick={orderHandler}

                />
                DescendingRating
            </label>
            <label className={style.check}>
                <input
                    type="radio"
                    name="order"
                    value="ascendingName"
                    onClick={orderHandler}

                />
                AscendingName
            </label>
            <label className={style.check}>
                <input
                    type="radio"
                    name="order"
                    value="descendingName"
                    onClick={orderHandler}

                />
                DescendingName
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
            className={style.nextPageButton}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <>
        {pagesToRender.map(page=>(
        <button
            className={style.pageButton}
            key={page}
            onClick={()=> setCurrentPage(page)}
            disabled={page === currentPage}
        >
            {page}
        </button>))}
        </>
        <button
            className={style.nextPageButton}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={lastItemIndex >= props.videogames.length}
        >
          Next Page
        </button>
      </div>
        </div>
    )
}
export default Cards 