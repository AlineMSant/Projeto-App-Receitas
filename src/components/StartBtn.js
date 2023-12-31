import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/styles/RecipeDetailsBtn.css';
import RecipesContext from '../context/RecipesContext';
import { getDoneRecipes, getInProgressRecipes } from '../helpers/LocalStorage';

function StartBtn() {
  const [arrayDoneRecipes, setArrayDoneRecipes] = useState([]);
  const [arrayInProgress, setArrayInProgress] = useState([]);

  const { details } = useContext(RecipesContext);
  const history = useHistory();
  const { pathname } = history.location;
  const routeMeals = pathname.includes('/meals');
  const routeDrink = pathname.includes('/drinks');

  useEffect(() => {
    const arrayDone = getDoneRecipes();
    const objInProgress = getInProgressRecipes();

    if (arrayDone) {
      const arrayIdsDone = arrayDone.map((obj) => obj.id);
      setArrayDoneRecipes(arrayIdsDone);
    }

    if (objInProgress) {
      const arrayAllIdsProgress = routeMeals ? [...Object.keys(objInProgress.meals)]
        : [...Object.keys(objInProgress.drinks)];

      setArrayInProgress(arrayAllIdsProgress);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickStart = () => {
    if (routeMeals) {
      history.push(`/meals/${details[0].idMeal}/in-progress`);
    }
    if (routeDrink) {
      history.push(`/drinks/${details[0].idDrink}/in-progress`);
    }
  };

  return (
    <div>

      {(details.length > 0) && (routeMeals
&& !arrayDoneRecipes.includes(details[0].idMeal))
&& (
  <button
    data-testid="start-recipe-btn"
    type="button"
    className="start-btn"
    onClick={ handleClickStart }
  >
    { arrayInProgress.includes(details[0].idMeal)
      ? 'Continue Recipe' : 'Start Recipe' }
  </button>
)}

      {(details.length > 0) && (routeDrink
&& !arrayDoneRecipes.includes(details[0].idDrink))
&& (
  <button
    data-testid="start-recipe-btn"
    type="button"
    className="start-btn"
    onClick={ handleClickStart }
  >
    { arrayInProgress.includes(details[0].idDrink)
      ? 'Continue Recipe' : 'Start Recipe' }
  </button>
)}
    </div>
  );
}

export default StartBtn;
