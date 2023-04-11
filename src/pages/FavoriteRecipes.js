import React, { useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import isFavIcon from '../images/blackHeartIcon.svg';
import BtnFiltersFav from '../components/BtnFiltersFav';
import Header from '../components/Header';
import { getFavoriteRecipe, updateFavoriteRecipe } from '../helpers/LocalStorage';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [arrayFavoritesRecipes, setArrayFavoritesRecipes] = useState([]);
  const [copyMessageToggle, setCopyMessageToggle] = useState(false);

  const recipeLink = window.location.href
    .substring(window.location.href, window.location.href.lastIndexOf('/'));

  function CopyToClipboard(link) {
    setCopyMessageToggle(true);
    return copy(link);
  }

  function removeFavoriteRecipe(recipeId) {
    const newRecipes = arrayFavoritesRecipes.filter((recipe) => recipe.id !== recipeId);

    updateFavoriteRecipe(newRecipes);
    setArrayFavoritesRecipes(newRecipes);
  }

  useEffect(() => {
    const savedRecipes = getFavoriteRecipe();
    setArrayFavoritesRecipes(savedRecipes);
  }, []);

  useEffect(() => {
    const fiveSeconds = 5000;
    const disableMessage = setTimeout(() => {
      setCopyMessageToggle(false);
    }, fiveSeconds);

    return () => clearTimeout(disableMessage);
  }, [copyMessageToggle, setCopyMessageToggle]);

  return (
    <div>
      <Header />
      <BtnFiltersFav />
      {arrayFavoritesRecipes && arrayFavoritesRecipes.map((recipe, index) => (
        <div key={ recipe.id }>

          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />

          <h2 data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</h2>
          <h1 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h1>

          { copyMessageToggle
            ? (
              <div>
                <span>Link copied!</span>
              </div>) : null }

          <button
            type="button"
            className="share-btn"
            onClick={ () => CopyToClipboard(
              `${recipeLink}/${recipe.type}s/${recipe.id}`,
            ) }
          >

            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="Share Icon"
            />
          </button>

          <button
            type="button"
            className="favorite-btn"
            onClick={ () => removeFavoriteRecipe(recipe.id) }
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ isFavIcon }
              alt="Favorite Icon"
            />
          </button>

        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
