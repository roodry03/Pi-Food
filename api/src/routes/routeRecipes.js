const { Router } = require('express');
const { getByNameHandlers, getByIdHandlers, createRecipes} = require('../handlers/recipesHandlers')
const recipesRouter = Router()

recipesRouter.get('/:idRecipe', getByIdHandlers );
recipesRouter.get('/', getByNameHandlers);
recipesRouter.post('/', createRecipes);

module.exports = recipesRouter;