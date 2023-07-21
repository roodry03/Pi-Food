import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./Detail.module.css"

const URL = "http://localhost:3001/recipes"

const Detail = () => {
    const {id} = useParams();

    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        axios(`${URL}/${id}`).then(({data}) => {
            if(data) {
                setRecipe(data);
            } else {
                window.alert("No se enontro receta con esa ID")
            }
        });
    }, [id]);


    return (
        <div>
            <div className={style.contenedor}>
                <div className={style.letras}>
                    <h1>{recipe.title}</h1>
                <div className={style.image}>
                     <img className={style.imagen1} src={recipe.image} alt=""/>
                </div>
                    <h2> HealthScore <p>{recipe.healthScore}</p> </h2>
                    <h2> Summary <p> {recipe.summary}  </p> </h2>
                    <h2> Steps to preparation  <p>{recipe.steps}</p> </h2>
                    <h2> Diets  <p>{recipe.diets}</p> </h2>
                </div>
            <div>
                <NavLink className={style.button} to={'/home'}>
                    HOME 
                </NavLink>
            </div>
            </div>
        </div>
    )
};

export default Detail;