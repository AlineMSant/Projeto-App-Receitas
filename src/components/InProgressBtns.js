import React, { useEffect, useContext } from 'react';
import shareIcon from '../images/shareIcon.svg';
import favIcon from '../images/whiteHeartIcon.svg';
import isFavIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';
import {
  saveFavoriteRecipe,
  getFavoriteRecipe,
  updateFavoriteRecipe,
} from '../helpers/LocalStorage';

const copy = require('clipboard-copy');

function InProgressBtns() {
  const {
    copyMessageToggle,
    setCopyMessageToggle,
    details,
    isFavorite,
    setIsFavorite,
  } = useContext(RecipesContext);
  const recipeLink = window.location.href
    .substring(window.location.href, window.location.href.lastIndexOf('/'));

  function CopyToClipboard() {
    setCopyMessageToggle(true);
    return copy(recipeLink);
  }

  function checkIfIsFavorite(savedRecipes, recipe) {
    return savedRecipes?.some(
      (item) => item.id === recipe?.idMeal
      || item.id === recipe?.idDrink,
    );
  }

  function removeFavoriteRecipe(recipeId) {
    const savedRecipes = getFavoriteRecipe();
    const newRecipes = savedRecipes.filter((recipe) => recipe.id !== recipeId);

    updateFavoriteRecipe(newRecipes);
    setIsFavorite(false);
  }

  function handleClickFavorite() {
    if (isFavorite) {
      removeFavoriteRecipe(details[0].idMeal || details[0].idDrink);
    } else {
      const favoriteRecipe = {
        id: details[0].idMeal || details[0].idDrink,
        type: details[0].idMeal ? 'meal' : 'drink',
        nationality: details[0].strArea || '',
        category: details[0].strCategory,
        alcoholicOrNot: details[0].strAlcoholic || '',
        name: details[0].strMeal || details[0].strDrink,
        image: details[0].strMealThumb || details[0].strDrinkThumb,
      };
      saveFavoriteRecipe(favoriteRecipe);
      setIsFavorite(true);
    }
  }

  useEffect(() => {
    const savedRecipes = getFavoriteRecipe();
    const isFavorited = checkIfIsFavorite(savedRecipes, details[0]);

    setIsFavorite(isFavorited);
  }, [details, setIsFavorite]);

  useEffect(() => {
    const fiveSeconds = 5000;
    const disableMessage = setTimeout(() => {
      setCopyMessageToggle(false);
    }, fiveSeconds);

    return () => clearTimeout(disableMessage);
  }, [setCopyMessageToggle]);

  return (

    <div
      className="share-favorite-container"
    >
      { copyMessageToggle
        ? (
          <div>
            <span>Link copied!</span>
          </div>) : null }

      <button
        type="button"
        className="share-btn"
        onClick={ () => CopyToClipboard() }
      >
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="Share Icon"
        />
      </button>

      <button
        type="button"
        className="favorite-btn"
        onClick={ () => handleClickFavorite() }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? isFavIcon : favIcon }
          alt="Favorite Icon"
        />
      </button>
    </div>
  );
}

export default InProgressBtns;
