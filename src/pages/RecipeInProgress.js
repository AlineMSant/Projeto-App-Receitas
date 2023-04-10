import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { fetchIdMeal, fetchIdDrink } from '../services/fetchAPI';
import ShareFavoriteBtn from '../components/ShareFavoriteBtn';
import FinishBtn from '../components/FinishBtn';
import '../assets/styles/RecipeInProgress.css';

export default function RecipeInProgress() {
  const { loading,
    setLoading,
    details,
    setDetails,
    ingredients,
    setIngredients,
    measures,
    setMeasures,
    setDisableBtnFinish } = useContext(RecipesContext);

  const history = useHistory();
  const { pathname } = history.location;
  const id = pathname.split('/')[2];
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

    if (pathname === `/meals/${id}/in-progress`) {
      requestIdMeal();
    }
    if (pathname === `/drinks/${id}/in-progress`) {
      requestIdDrink();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const label = e.target.parentNode;

    if (e.target.checked === true) {
      label.className = 'selected';
    } else {
      label.className = 'no-selected';
    }
    const inputs = document.querySelectorAll('.checkbox');
    const arrayOfBooleans = [];
    inputs.forEach((input) => {
      arrayOfBooleans.push(input.checked);
    });
    const everyTrue = arrayOfBooleans.every((boolean) => boolean === true);
    setDisableBtnFinish(!everyTrue);
  };

  return (
    <div>
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

              <div>
                {ingredients.map((ingredient, index) => (
                  <label
                    key={ index }
                    data-testid={ `data-testid=${index}-ingredient-step` }
                    id={ `data-testid=${index}-ingredient-step` }
                  >
                    <input
                      className="checkbox"
                      type="checkbox"
                      id={ `data-testid=${index}-ingredient-step` }
                      name={ `${ingredient} ${measures[index]}` }
                      onChange={ (e) => handleChange(e) }
                    />
                    { `${ingredient} ${measures[index]}` }
                  </label>))}
              </div>

              <p data-testid="instructions">{ details[0].strInstructions }</p>
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

              <div>
                {ingredients.map((ingredient, index) => (
                  <label
                    key={ index }
                    data-testid={ `data-testid=${index}-ingredient-step` }
                    id={ `data-testid=${index}-ingredient-step` }
                  >
                    <input
                      className="checkbox"
                      id={ `data-testid=${index}-ingredient-step` }
                      type="checkbox"
                      name={ `${ingredient} ${measures[index]}` }
                      onChange={ (e) => handleChange(e) }
                    />
                    { `${ingredient} ${measures[index]}` }
                  </label>))}
              </div>

              <p data-testid="instructions">{ details[0].strInstructions }</p>
            </div>
          )}
          <ShareFavoriteBtn />
          <FinishBtn />
        </div>
      )}

    </div>
  );
}
