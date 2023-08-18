import { NavLink } from "react-router-dom" 
import style from "./Enter.module.css"
const Enter = ()=> {
    return(
        <div className={style.container}>
        
        <button className={style.button} ><NavLink to="/home" className={style.button}><h2>Enter</h2></NavLink></button>
        </div>
    )
}
export default Enter 