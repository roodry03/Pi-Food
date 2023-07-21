import axios from 'axios'
import { GET_RECIPES, GET_BY_NAME, FILTER, ORDER_H, ORDER_T, POST_RECIPE, PAGINATE } from './actions-types'


const URL = "http://localhost:3001"
export function getRecipes ()  {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL}/recipes`);
            return dispatch({
                type: GET_RECIPES,
                payload: response.data,
            });
        } catch (error) {
            alert(error.response.data.error)
        }
    };
};

//-----------------------------------------------------------------------------------------------------

export function getByName (name) {
    return async function (dispatch) {
        const response = await axios.get(`${URL}/recipes/?name=${name}`);
        return dispatch({
            type: GET_BY_NAME,
            payload: response.data,
        });
    };
};

//----------------------------------------------------------------------------------------------------------

export function postRecipe (data) {
    return async function (dispatch) {
        try {
            const response = await axios.post(`${URL}/recipes`, data);
            console.log(response);
            alert("Receta creada corretamente");
            return dispatch({
                type: POST_RECIPE,
                payload: "",
            });
            
        } catch (error) {
            console.log(error);
            alert(error.response.data.error)
        }
    };
};

//-------------------------------------------------------------------------------------------------

export function filterRecipe (diet) {
    return async function (dispatch) {
        return await dispatch({
            type: FILTER,
            payload: diet,

        });
    };
};

//-------------------------------------------------------------------------------------------------

export function paginate (order) {
    return async function (dispatch) {
        return await dispatch({
            type: PAGINATE,
            payload: order,
        });
    };
};

//-------------------------------------------------------------------------------------------------

export function orderRecipeByHealthScore (order) {
    return async function (dispatch) {
        return await dispatch({
            type: ORDER_H,
            payload: order,
        });
    };
};

//-------------------------------------------------------------------------------------------------

export function orderRecipeByTitle (order) {
    return async function (dispatch) {
        return await dispatch({
            type: ORDER_T,
            payload: order,
        })
    }
}

