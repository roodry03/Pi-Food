import { useDispatch } from "react-redux";
import { useState } from "react";
import { postRecipe } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import validation from './validations'
import style from './Create.module.css'

const Create = () => {
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        title: "",
        summary: "",
        healthScore: 0,
        steps: "",
        image: "",
        diets: [],
    });

    const [error, setError] = useState({
        title: "",
        summary: "",
        healthScore: "",
        steps: "",
        image: "",
        diets: [],
    });


    function handleChange(event) {
        setInput({
          ...input, 
          [event.target.name]: event.target.value,
        });
        setError(
          validation({
            ...input,
            [event.target.name]: event.target.value,
          })
        );
      }


    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(postRecipe(input));
    }

    const handleSelectChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map((option) => option.value);
        setInput((prevInput) => ({...prevInput, diets: selectedOptions }));
        
    };
    
    return (
        <div className={style.contenedor}>
            <form action="" onSubmit={handleSubmit}>
                <div className={style.contenedor1}>
            <NavLink className={style.home} to='/home'>
                 HOME
            </NavLink>
                    <label htmlFor=""> Name: </label>
                    <input type="text" name="title" value={input.title} onChange={handleChange} />
                    <p> {error.title} </p>
                    <label htmlFor="">
                        Summary:{" "}
                    </label>
                    <textarea
                        type="text" name="summary" value={input.summary} onChange={handleChange}
                    />
                    <label htmlFor="">
                        Steps for creation: {" "}
                    </label>
                    <textarea 
                        type="text" name="steps" value={input.steps} onChange={handleChange}
                    />
                    <label htmlFor="">
                        Image: {" "}
                    </label>
                    <input
                        type="text" name="image" value={input.image} onChange={handleChange}
                    />
                    <label htmlFor="">
                        Diets: {" "}
                    </label>
                    <select multiple id="diets" onChange={handleSelectChange} >
                        <option value="gluten free">Gluten free</option>
                        <option value="dairy free">Dairy free</option>
                        <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="paleolithic">Paleolithic</option>
                        <option value="primal">Primal</option>
                        <option value="wole 30">Wole 30</option>
                        <option value="pescatarian">Pescatarian</option>
                        <option value="ketogenic">Ketogenic</option>
                        <option value="foodmap friendly">Foodmap friendly</option>
                    </select>
                    <label htmlFor="">
                        Health Score: {" "}
                    </label>
                    <input
                        type="number" name="healthScore" value={input.healthScore} onChange={handleChange}
                    />
                    <p> {error.healthScore}</p>
                    <button className={style.button} type="submit">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Create;