import SearchBar from "../SearchBar/SearchBar";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setGames } from "../../redux/actions";
import style from "./NavBar.module.css"

const NavBar = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onClickHome= () => {
        
        axios.get("http://localhost:3001/videogames")
            .then(response => {dispatch(setGames(response.data))})
            .then(navigate("/home"))  

    }
    const onClickCreation= () => {
        navigate("/creation");  
    }
return (
    <div className={style.container}>
        <button className={style.home} onClick={onClickHome}>Home</button>
        {useLocation().pathname==="/home" && <SearchBar  handleSubmit={props.handleSubmit}/>}
        <button className={style.create} onClick={onClickCreation}>Create</button>
    </div>
)
}

export default NavBar;