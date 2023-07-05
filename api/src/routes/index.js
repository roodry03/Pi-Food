const { Router } = require('express');
const routeRecipes = require('./routeRecipes');
const routeDiets = require('./routeDiets');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use('/recipes', routeRecipes);
router.use('/diets', routeDiets);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
