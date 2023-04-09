import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function FinishBtn() {
  const { disableBtnFinish } = useContext(RecipesContext);
  return (
    <div>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ disableBtnFinish }
      >
        Finish Recipe
      </button>
    </div>
  );
}
