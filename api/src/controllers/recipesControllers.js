const { Recipe, Diets } = require('../db')
const { Op } = require('sequelize')
const axios = require('axios')
const { API_KEY } = process.env
// https://api.spoonacular.com/recipes/716426/information?apiKey=e45669b75f90489f96c7ea1cca2fe8d7
//----------------------------------RecipeById----------------------------------------------------------
const URL = 'https://api.spoonacular.com/recipes'

const getRecipeById = async (idRecipe, source) => {
    
    const recipe = source === "api" ? await axios.get(`${URL}/${idRecipe}/information?apiKey=${API_KEY}`) 
    .then((response) => {
        const data = response.data;
        const diets = data.diets.join(' - ');
        const summary = data.summary.replace(/<[^>]+>/g, "");
        const instructions = data.instructions.replace(/<[^>]+>/g, "");
        const result = {
            id: data.id,
            title: data.title,
            image: data.image,
            summary: summary,
            healthScore: data.healthScore,
            steps: instructions,
            diets: diets,
        };
        return result;
    })
: await Recipe.findByPk(idRecipe);
    return recipe;
};


//----------------------------------RecipeByName----------------------------------------------------------
//RecipeByName hecho!
const getRecipeByName = async (name) => {
   const nameByDb = await Recipe.findAll({
    where: { 
        title: { [Op.iLike]: name },
     },
     includes: {
        model: Diets,
        as: "dietAssociations",
        attributes: ["name"],
        through: { attributes: [] }
     },
   });
   const nameByApi = await axios.get('https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5')
   .then((response) => {
    const data = response.data.results.filter((recipe) =>
            recipe.title.toLowerCase().includes(name.toLowerCase())
        );
        const results = data.map((recipe) => {
            const diets = recipe.diets.join(" - ");

            const recipeFiltered = {
                id: recipe.id,
                title: recipe.title,
                vegetarian: recipe.vegetarian,
                vegan: recipe.vegan,
                glutenFree: recipe.glutenFree,
                healthScore: recipe.healthScore,
                diets: diets,
                image: recipe.image,
                created: false
            };
            return recipeFiltered;
        });
        return results;
   });
   return [...nameByApi, ...nameByDb];
};

const getAll = async () => {
    const nameByDb = await Recipe.findAll();
    const nameByApi = await axios.get('https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5')
    .then((response) => {
        const data = response.data.results;
        const results = data.map((recipe) => {
            const diets = recipe.diets.join(" - ");
            const recipeFiltered = { 
                id: recipe.id,
                title: recipe.title,
                vegetarian: recipe.vegetarian,
                vegan: recipe.vegan,
                glutenFree: recipe.glutenFree,
                healthScore: recipe.healthScore,
                diets: diets,
                image: recipe.image,
                created: false
            };
            return recipeFiltered;
        });
        return results;
    });
    return [...nameByApi, ...nameByDb];
};


//----------------------------------CreateRecipe----------------------------------------------------------
//create recipe hecho!
const createRecipe = async (
    title,
    image,
    summary,
    healthScore,
    steps,
    diets
  ) => {
    const newRecipe = await Recipe.create({
      title,
      image,
      summary,
      healthScore,
      steps,
      diets,
    });
  
    for (const diet of diets) {
      const newModel = await Diets.findOne({ where: { name: diet } });
      await newRecipe.addDietAssociations(newModel);
    }
  
    return newRecipe;
  };


module.exports = {
    getRecipeByName,
    getAll,
    getRecipeById,
    createRecipe,
    
}