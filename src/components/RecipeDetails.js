import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchIdMeal, fetchIdDrink } from '../services/fetchAPI';

function RecipeDetails() {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const history = useHistory();
  const { pathname } = history.location;
  const id = pathname.substring(pathname.lastIndexOf('/') + 1);
  const routeMeals = pathname.includes('/meals');

  useEffect(() => {
    const requestIdMeal = async () => {
      const data = await fetchIdMeal(id);
      const number = 21;
      const arrayIngredients = [];
      const arrayMeasures = [];

      for (let i = 1; i < number; i += 1) {
        const strI = `strIngredient${i}`;
        const value = data[0][strI];
        const strM = `strMeasure${i}`;
        if (value !== null && value !== '') {
          arrayIngredients.push(data[0][strI]);
          arrayMeasures.push(data[0][strM]);
        }
      }
      setIngredients(arrayIngredients);
      setMeasures(arrayMeasures);
      setDetails(data);
      setLoading(false);
    };

    const requestIdDrink = async () => {
      const data = await fetchIdDrink(id);
      const number = 16;
      const arrayIngredients = [];
      const arrayMeasures = [];

      for (let i = 1; i < number; i += 1) {
        const strI = `strIngredient${i}`;
        const value = data[0][strI];
        const strM = `strMeasure${i}`;
        if (value !== null && value !== '') {
          arrayIngredients.push(data[0][strI]);
          arrayMeasures.push(data[0][strM]);
        }
      }
      setIngredients(arrayIngredients);
      setMeasures(arrayMeasures);
      setDetails(data);
      setLoading(false);
    };

    if (pathname === `/meals/${id}`) {
      requestIdMeal();
    }
    if (pathname === `/drinks/${id}`) {
      requestIdDrink();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Recipe Details</h1>
      {loading === true ? <p>Carregando...</p> : (
        <div>
          {routeMeals ? (
            <div>
              <img
                data-testid="recipe-photo"
                src={ details[0].strMealThumb }
                alt={ details[0].strMeal }
              />
              <h1 data-testid="recipe-title">{ details[0].strMeal }</h1>
              <h2 data-testid="recipe-category">{ details[0].strCategory }</h2>

              <ul>
                {ingredients.map((ingredient, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${ingredient} ${measures[index]}`}
                  </li>))}
              </ul>

              <p data-testid="instructions">{ details[0].strInstructions }</p>
              <iframe
                data-testid="video"
                title="Youtube VIdeo"
                src={ details[0].strYoutube }
                allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          ) : (
            <div>
              <img
                data-testid="recipe-photo"
                src={ details[0].strDrinkThumb }
                alt={ details[0].strDrink }
              />
              <h1 data-testid="recipe-title">{ details[0].strDrink }</h1>
              <h2 data-testid="recipe-category">{ details[0].strAlcoholic }</h2>

              <ul>
                {ingredients.map((ingredient, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${ingredient} ${measures[index]}`}
                  </li>))}
              </ul>

              <p data-testid="instructions">{ details[0].strInstructions }</p>
            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default RecipeDetails;
