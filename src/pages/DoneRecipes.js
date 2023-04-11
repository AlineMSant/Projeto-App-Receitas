import React, { useEffect, useState } from 'react';
// import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import BtnFiltersDone from '../components/BtnFiltersDone';
import Header from '../components/Header';
import { getDoneRecipes } from '../helpers/LocalStorage';

// const copy = require('clipboard-copy');

function DoneRecipes() {
  const [arrayDoneRecipes, setArrayDoneRecipes] = useState([]);
  // const {
  //   setCopyMessageToggle,
  //   copyMessageToggle,
  // } = useContext(RecipesContext);

  useEffect(() => {
    const doneRecipes = getDoneRecipes();
    setArrayDoneRecipes(doneRecipes);
  }, []);

  // const recipeLink = window.location.href;

  // function CopyToClipboard() {
  //   setCopyMessageToggle(true);
  //   return copy(recipeLink);
  // }

  // useEffect(() => {
  //   const fiveSeconds = 5000;
  //   const disableMessage = setTimeout(() => {
  //     setCopyMessageToggle(false);
  //   }, fiveSeconds);

  //   return () => clearTimeout(disableMessage);
  // }, [setCopyMessageToggle]);

  return (
    <div>
      <Header />
      <BtnFiltersDone />
      {arrayDoneRecipes && arrayDoneRecipes.map((recipe, index) => (
        <div key={ recipe.id }>

          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />

          {recipe.type === 'meal' ? (
            <div>
              <h2
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${recipe.nationality} - ${recipe.category}` }
              </h2>
              <h1 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h1>
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
              <h2
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipe.alcoholicOrNot }
              </h2>
              <h1 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h1>
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

          {/* { copyMessageToggle
            ? (
              <div>
                <span>Link copied!</span>
              </div>) : null } */}

          <button
            type="button"
            className="share-btn"
            // onClick={ () => CopyToClipboard() }
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
