import shareIcon from '../images/shareIcon.svg';
import favIcon from '../images/blackHeartIcon.svg';

function ShareFavoriteBtn() {
  return (
    <>
      <button
        type="button"
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
