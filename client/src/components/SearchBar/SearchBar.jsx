import style from './SearchBar.module.css'

const SearchBar = ({ handleSubmit, handleChange }) => {
    return (
        <div className={style.contenedorSearch}>
            <form onChange={ handleChange }>
                <h3> Search recipes</h3>
                <input className={style.input} type="search"/>
                <button  className={style.button} type="submit" onClick={ handleSubmit }>
                    Buscar
                </button>
            </form>
        </div>
    )
};

export default SearchBar;