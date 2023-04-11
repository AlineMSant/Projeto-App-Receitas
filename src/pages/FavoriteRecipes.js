import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import isFavIcon from '../images/blackHeartIcon.svg';
import BtnFiltersFav from '../components/BtnFiltersFav';
import Header from '../components/Header';
import { getFavoriteRecipe, updateFavoriteRecipe } from '../helpers/LocalStorage';
import '../assets/styles/FavoriteRecipes.css';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const { arrayFavoriteRecipes, setArrayFavoriteRecipes,
    setArrayFavoriteRecipesFiltered } = useContext(RecipesContext);
  const [copyMessageToggle, setCopyMessageToggle] = useState(false);
  const history = useHistory();

  const recipeLink = window.location.href
    .substring(window.location.href, window.location.href.lastIndexOf('/'));

  function CopyToClipboard(link) {
    setCopyMessageToggle(true);
    return copy(link);
  }

  function removeFavoriteRecipe(recipeId) {
    const newRecipes = arrayFavoriteRecipes.filter((recipe) => recipe.id !== recipeId);

    updateFavoriteRecipe(newRecipes);
    setArrayFavoriteRecipes(newRecipes);
  }

  useEffect(() => {
    const savedRecipes = getFavoriteRecipe();
    setArrayFavoriteRecipes(savedRecipes);
    setArrayFavoriteRecipesFiltered(savedRecipes);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fiveSeconds = 5000;
    const disableMessage = setTimeout(() => {
      setCopyMessageToggle(false);
    }, fiveSeconds);

    return () => clearTimeout(disableMessage);
  }, [copyMessageToggle, setCopyMessageToggle]);

  function handleOnClickPush(type, id) {
    if (type === 'meal') {
      history.push(`/meals/${id}`);
    } else {
      history.push(`/drinks/${id}`);
    }
  }

  return (
    <div>
      <Header />
      <BtnFiltersFav />
      {arrayFavoriteRecipes && arrayFavoriteRecipes.map((recipe, index) => (
        <div key={ recipe.id }>

          <button
            type="button"
            onClick={ () => handleOnClickPush(recipe.type, recipe.id) }
          >
            <img
              className="img-done"
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
          </button>

          { recipe.type === 'meal' ? (
            <div>
              <button
                type="button"
                onClick={ () => handleOnClickPush(recipe.type, recipe.id) }
              >

                <h1 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h1>
              </button>

              <h2 data-testid={ `${index}-horizontal-top-text` }>
                { `${recipe.nationality} - ${recipe.category}` }
              </h2>
            </div>
          ) : (
            <div>
              <button
                type="button"
                onClick={ () => handleOnClickPush(recipe.type, recipe.id) }
              >
                <h2 data-testid={ `${index}-horizontal-top-text` }>
                  { recipe.alcoholicOrNot }
                </h2>
                <h1 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h1>
              </button>
            </div>
          ) }

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
