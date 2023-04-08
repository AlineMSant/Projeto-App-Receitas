import React, { useEffect, useContext } from 'react';
import shareIcon from '../images/shareIcon.svg';
import favIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';

const copy = require('clipboard-copy');

function ShareFavoriteBtn() {
  const { copyMessageToggle, setCopyMessageToggle } = useContext(RecipesContext);
  const recipeLink = window.location.href;

  function CopyToClipboard() {
    setCopyMessageToggle(true);
    return copy(recipeLink);
  }

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
      >
        <img
          data-testid="favorite-btn"
          src={ favIcon }
          alt="Favorite Icon"
        />
      </button>
    </div>
  );
}

export default ShareFavoriteBtn;
