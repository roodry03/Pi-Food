import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes, getByName, filterRecipe, paginate, orderRecipeByHealthScore, orderRecipeByTitle } from '../../redux/actions'
import { NavLink } from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar'
import Cards from '../../components/Cards/Cards'
import style from './Home.module.css'

const Home = () => {
    const dispatch = useDispatch()
    const recipesFilteredCopy = useSelector((state) => state.recipesFilteredCopy);
    const filter = useSelector((state) => state.filter);
    const recipesP =  useSelector((state) => state.recipesP);

    
    //-----------------------------Paginado desde redux-------------------------------------------------
     const nextPage = () => {
        dispatch(paginate("next"));
     };

     const prevPage = () => {
        dispatch(paginate("prev"));
     };


     //---------------------------------------------Search Con el Backend------------------------------------

     const [searchTitle, SetSearchTitle] = useState("");

     const handleChange = (event) => {
        event.preventDefault();
        SetSearchTitle(event.target.value);
     };

     const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getByName(searchTitle));
     };


     //---------------------------------------------------Filtrado------------------------------------------------

     const handlerFilter = (event) => {
        event.preventDefault();
        dispatch(filterRecipe(event.target.value));
     };

     //------------------------------------------------Order--------------------------------------------------------

     const handlerOrder = (event) => {
        event.preventDefault();
        dispatch(orderRecipeByHealthScore(event.target.value));
     };

     const handlerOrderByTitle = (event) => {
        event.preventDefault();
        dispatch(orderRecipeByTitle(event.target.value));
      };
      
      //-------------------------------------------------------------------------------------------------
      
      useEffect(() => {
         dispatch(getRecipes());
      }, [dispatch]);
      
      return (
         <div className={style.contenedor}>
            <h1 className={style.titulo}>Pi Food</h1>
            <NavLink to="/create">
                <button className={style.create}> CREATE RECIPE </button>
            </NavLink>
            <div className={style.contenedorSelect}>
            <select className={style.select} onChange={handlerOrderByTitle}>
                <option value="C"> Order A-Z </option>
                <option value="Z"> Order Z-A </option>
            </select>
            <select className={style.select} onChange={handlerOrder}>
                <option value="A"> Ascendente </option>
                <option value="D"> Desencente </option>
            </select>
            <select className={style.select} onChange={handlerFilter}>
                <option value="all"> All </option>
                <option value="gluten free"> Gluten free </option>
                <option value="dairy free"> Dairy free </option>
                <option value="lacto ovo vegetarian"> Lacto ovo vegetarian </option>
                <option value="vegan"> Vegan </option>
                <option value="paleolithic"> Paleolithic </option>
                <option value="primal"> Primal </option>
                <option value="whole 30"> Whole 30 </option>
                <option value="pescatarian"> Pescatarian </option>
                <option value="ketogenetic"> Ketogenetic </option>
                <option value="fodmap friendly"> Foodmap Friendly </option>
            </select>
            </div>
           <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />
            <Cards 
                allRecipes={filter ? recipesFilteredCopy : recipesP}
            />
            
            <div className={style.contenedorBotones}  role="group" aria-label="Basic mixed styles example" >

            <button type="button" className={style.boton} onClick={() => prevPage()}>
               PREV
            </button>

            <button type="button" className={style.boton} onClick={() => nextPage()}>
               NEXT
            </button>

            </div>
        </div>
    )
};

export default Home;
