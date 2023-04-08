import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/styles/RecipeDetailsBtn.css';
import RecipesContext from '../context/RecipesContext';
import { getDoneRecipes } from '../helpers/LocalStorage';

function StartBtn() {
  const [arrayDoneRecipes, setArrayDoneRecipes] = useState([]);
  const { details } = useContext(RecipesContext);
  const history = useHistory();
  const { pathname } = history.location;
  const routeMeals = pathname.includes('/meals');
  const routeDrink = pathname.includes('/drinks');

  useEffect(() => {
    const arrayDone = getDoneRecipes();
    if (arrayDone) {
      const arrayIdsDone = arrayDone.map((obj) => obj.id);
      setArrayDoneRecipes(arrayIdsDone);
    }
  }, []);

  return (
    <div>
      {(details.length > 0) && (routeMeals
      && !arrayDoneRecipes.includes(details[0].idMeal))
      && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="start-btn"
        >
          Start Recipe
        </button>
      )}

      {(details.length > 0) && (routeDrink
      && !arrayDoneRecipes.includes(details[0].idDrink))
      && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="start-btn"
        >
          Start Recipe
        </button>
      )}
    </div>
  );
}

export default StartBtn;
