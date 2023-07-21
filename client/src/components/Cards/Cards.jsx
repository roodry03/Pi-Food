import Card from '../Card/Card'

const Cards = ({ allRecipes }) => {
    const recipeList = allRecipes;
    return (
        <div>
            {recipeList?.map((recipe) => (
                <Card recipe={recipe} key={recipe.id} />
            ))}
        </div>
    );
};

export default Cards;