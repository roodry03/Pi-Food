const { Diets } = require('../db')
const axios = require('axios')
const { API_KEY } = process.env

const URL = "https://api.spoonacular.com/recipes"
const getDietsHandlers = async (req, res) => {
    try {
        await axios.get(`${URL}/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`)
        .then(async (response) => {
            const array1 = [];
            const array2 = [];
            const data = response.data.results;
            data.map(async (ele) => {
                if(ele.diets && ele.diets.length > 0) {
                    const arrToString = ele.diets.toString();
                    array1.push(arrToString);
                }
            });
            array1.join().split(',').filter((ele) => {
                if(!array2.includes(ele)) array2.push(ele);
            });
            console.log(array2);
            array2.map(async (ele) => {
                const newDiet = await Diets.create({ name: ele });
                console.log(newDiet);
            });
            res.status(200).json(array2);
        })
        
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
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