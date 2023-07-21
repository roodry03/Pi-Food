const { Diets } = require('../db')
const axios = require('axios')
const { API_KEY } = process.env

const URL = "https://api.spoonacular.com/recipes"
const getDietsHandlers = async (req, res) => {
    await axios
    .get(
      `${URL}/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`
    )
    .then(async (response) => {
      const arrToStr = [];
      const dietsFiltered = [];
      const arrDiets = [];
      const data = await response.data.results;
      data.map(async (element) => {
        if (element.diets && element.diets.length > 0) {
          const arrToString = element.diets.toString();
          arrToStr.push(arrToString);
        }
      });
      arrToStr
        .join()
        .split(",")
        .filter((element) => {
          if (!dietsFiltered.includes(element)) dietsFiltered.push(element);
        });

      dietsFiltered.map(async (element) => {
        const newDiet = await Diets.create({ name: element });
        arrDiets.push(newDiet);
      });

      res.status(200).json(dietsFiltered);
    })
    .catch(function (error) {
      res.status(400).json({ error: error.message });
    });
};

module.exports = { getDietsHandlers }

// const getDietsHandlers = async (req, res) => {
//     try {
//         const allDiets = await getDiets();

//         return res.status(200).json(allDiets);
        
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// };