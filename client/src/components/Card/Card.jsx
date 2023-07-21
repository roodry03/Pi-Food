import { NavLink } from 'react-router-dom'
import style from './Card.module.css'

const Card = ({ recipe }) => {
    const { title, diets, image, id, dietAssociations } = recipe;
    const dietsRender = [];
    if(dietAssociations) {
        dietAssociations.map((diet) => dietsRender.push(diet.name));
    }
    return (
        <div className={style.contenedor}>
             <h2> {title} </h2>
            <img src={image} alt='' />
            <NavLink className={style.detail} to={`/home/${id}`}>
                Detail
            </NavLink>
            <h4> Diets: { diets ? diets : dietsRender.join(" - ") } </h4>
        </div>
    )
};

export default Card;