import { useState } from "react"
import { useNavigate } from "react-router-dom";
import style from "./SearchBar.module.css"

const SearchBar = ({handleSubmit}) => {
    let [name, setName] = useState("");
    const navigate = useNavigate();
    const handleChange = (event)=>{
        setName(event.target.value);
    }
    const handleSearch = () => {
        handleSubmit(name);
        navigate("/home")
    }
    
    return(
        <div className={style.container}>
        <input className={style.input} type="search" onChange={handleChange} value={name} placeholder="Search a videogame"/>
        <button className={style.search} onClick={handleSearch} id={name} >Buscar</button>
        </div>
    )
}

export default SearchBar
