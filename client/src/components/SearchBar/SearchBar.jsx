import { useState } from "react"
import { useNavigate } from "react-router-dom";

const SearchBar = ({handleSubmit}) => {
    let [name, setName] = useState("");
    const navigate = useNavigate();
    const handleChange = (event)=>{
        setName(event.target.value);
    }
    const handleSearch = () => {
        handleSubmit(name);
    //    setName("");
        navigate("/home")
    }
    return(
        <>
        <input type="search" onChange={handleChange} value={name} placeholder="Busca un vídeojuego"/>
        <button onClick={handleSearch} id={name} >Buscar</button>
        </>
    )
}

export default SearchBar
