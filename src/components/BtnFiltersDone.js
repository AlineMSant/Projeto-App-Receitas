import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function BtnFiltersDone() {
  const {
    setArrayDoneRecipes,
    arrayDoneRecipesFiltered,
  } = useContext(RecipesContext);

  function handleOnClickMeals() {
    const filteredMeals = arrayDoneRecipesFiltered
      .filter((recipe) => recipe.type === 'meal');
    setArrayDoneRecipes(filteredMeals);
  }

  function handleOnClickDrinks() {
    const filteredDrinks = arrayDoneRecipesFiltered
      .filter((recipe) => recipe.type === 'drink');
    setArrayDoneRecipes(filteredDrinks);
  }

  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => setArrayDoneRecipes(arrayDoneRecipesFiltered) }
      >
        All
      </button>

      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => handleOnClickMeals() }
      >
        Meals
      </button>

      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => handleOnClickDrinks() }
      >
        Drinks
      </button>
    </div>
  );
}

export default BtnFiltersDone;
