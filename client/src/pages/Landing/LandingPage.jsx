import { NavLink } from "react-router-dom"
import style from "./Landing.module.css"

const LandingPage = () => {
    return (
        <div className={style.contenedor}>
            <div className={style.contenedor1}>
            <h1> Henry Food</h1>
            <NavLink className={style.home} to="/home">
                <button className={style.boton}>ENTRAR</button>
            </NavLink>

            </div>
        </div>
    )
};

export default LandingPage;