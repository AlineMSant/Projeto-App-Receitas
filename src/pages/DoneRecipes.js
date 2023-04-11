import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import BtnFiltersDone from '../components/BtnFiltersDone';
import Header from '../components/Header';
import { getDoneRecipes } from '../helpers/LocalStorage';
import '../assets/styles/DoneRecipes.css';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const { arrayDoneRecipes, setArrayDoneRecipes,
    setArrayDoneRecipesFiltered } = useContext(RecipesContext);
  const [copyMessageToggle, setCopyMessageToggle] = useState(false);
  const history = useHistory();
  console.log(arrayDoneRecipes);

  const recipeLink = window.location.href
    .substring(window.location.href, window.location.href.lastIndexOf('/'));

  function CopyToClipboard(link) {
    setCopyMessageToggle(true);
    return copy(link);
  }

  useEffect(() => {
    const doneRecipes = getDoneRecipes();
    setArrayDoneRecipes(doneRecipes);
    setArrayDoneRecipesFiltered(doneRecipes);
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
    }
    if (type === 'drink') {
      history.push(`/drinks/${id}`);
    }
  }

  return (
    <div>
      <Header />
      <BtnFiltersDone />
      {arrayDoneRecipes && arrayDoneRecipes.map((recipe, index) => (
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

          {recipe.type === 'meal' ? (
            <div>
              <button
                type="button"
                onClick={ () => handleOnClickPush(recipe.type, recipe.id) }
              >
                <h1 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h1>
              </button>

              <h2
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${recipe.nationality} - ${recipe.category}` }
              </h2>

              <h2
                data-testid={ `${index}-horizontal-done-date` }
              >
                { recipe.doneDate }
              </h2>

              {recipe.tags.map((tag) => (
                <p
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  { tag }
                </p>
              ))}
            </div>
          ) : (
            <div>
              <button
                type="button"
                onClick={ () => handleOnClickPush(recipe.type, recipe.id) }
              >
                <h1 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h1>
              </button>

              <h2
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipe.alcoholicOrNot }
              </h2>
              <h2
                data-testid={ `${index}-horizontal-done-date` }
              >
                { recipe.doneDate }
              </h2>

              {recipe.tags.map((tag) => (
                <p
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  { tag }
                </p>
              ))}
            </div>
          )}

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

        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
