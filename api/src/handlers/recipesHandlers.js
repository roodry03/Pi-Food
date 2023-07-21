const { getRecipeByName, getAll, getRecipeById, createRecipe } = require('../controllers/recipesControllers');

//params --> /:id
// const getRecipisIdHandlers = (req, res) => {
//     const { id } = req.params;
//         res.status(200).send(`Encontramos la receta con la id: ${id}`)
// };


//query --> /recipes?name="..."
// const getRecipisHandlers = async (req, res) => {
//   const { title } = req.query;
// try {
//     if (title) {
//         const response = await getRecipeDb(title);
//         return res.status(200).json(response);
//     }
//     res.status(200).send('No se encontro la receta');
// } catch (error) {
//     res.status(400).json({ error: error.message });
// }
// };

//-------------------------------------------getById---------------------------------------------------


const getByIdHandlers = async (req, res) => {
    const { idRecipe } = req.params;
    console.log("PARAMS", req.params);
    try {
        const source = isNaN(idRecipe) ? "db" : "api";
        const response = await getRecipeById(idRecipe, source);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    };

};


//-------------------------------------------getByName---------------------------------------------------

const getByNameHandlers = async (req, res) => {
    const { name } = req.query;
    try {
        if(name) {
           const result = await getRecipeByName(name);
           res.status(200).json(result);
        } else {
            const result = await getAll();
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};



//-------------------------------------------createRecipe---------------------------------------------------



const createRecipes = async (req, res) => {
  const { title, image, summary, healthScore, steps, diets } =
    req.body;
    try {
      const response = await createRecipe(
        title,
        image,
        summary,
        healthScore,
        steps,
        diets
      );
      res.status(200).json(response);
    } catch (error) {
      res
        .status(400)
        .json({ error: "Todos lo campos deben llenarse de forma obligatoria"});
    }
  };

module.exports = {
    getByNameHandlers,
    getByIdHandlers,
    createRecipes
}