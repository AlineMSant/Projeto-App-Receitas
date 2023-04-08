import React, { useState, useEffect } from 'react';
import shareIcon from '../images/shareIcon.svg';
import favIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function ShareFavoriteBtn() {
  const [copyMessageToggle, setCopyMessageToggle] = useState(false);
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
  }, []);

  return (
    <>
      { copyMessageToggle
        ? (
          <div>
            <span>Link copied!</span>
          </div>) : null }

      <button
        type="button"
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
      >
        <img
          data-testid="favorite-btn"
          src={ favIcon }
          alt="Favorite Icon"
        />
      </button>
    </>
  );
}

export default ShareFavoriteBtn;
