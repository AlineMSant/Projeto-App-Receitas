import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function BtnFiltersFav() {
  const {
    arrayFavoriteRecipesFiltered,
    setArrayFavoriteRecipes,
  } = useContext(RecipesContext);

  function handleOnClickMeals() {
    const filteredMeals = arrayFavoriteRecipesFiltered
      .filter((recipe) => recipe.type === 'meal');
    setArrayFavoriteRecipes(filteredMeals);
  }

  function handleOnClickDrinks() {
    const filteredDrinks = arrayFavoriteRecipesFiltered
      .filter((recipe) => recipe.type === 'drink');
    setArrayFavoriteRecipes(filteredDrinks);
  }

  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => setArrayFavoriteRecipes(arrayFavoriteRecipesFiltered) }
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

export default BtnFiltersFav;
