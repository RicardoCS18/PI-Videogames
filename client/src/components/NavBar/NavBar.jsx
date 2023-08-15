import SearchBar from "../SearchBar/SearchBar";
import { useNavigate, useLocation } from "react-router-dom";

const NavBar = (props) => {
    const navigate = useNavigate();
    const onClickHome= () => {
        navigate("/home");  
    }
    const onClickCreation= () => {
        navigate("/creation");  
    }
return (
    <div>
        <button onClick={onClickHome}>Home</button>
        {useLocation().pathname==="/home" && <SearchBar handleSubmit={props.handleSubmit}/>}
        <button onClick={onClickCreation}>Create</button>
    </div>
)
}

export default NavBar;