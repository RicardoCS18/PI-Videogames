import { NavLink } from "react-router-dom" 
const About = ()=> {
    return(
        <>
        <p>Welcome to this videogame page</p>
        <button><NavLink to="/home"><h2>Enter</h2></NavLink></button>
        </>
    )
}
export default About 