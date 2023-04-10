import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { saveDoneRecipes } from '../helpers/LocalStorage';

export default function FinishBtn() {
  const { disableBtnFinish, details } = useContext(RecipesContext);
  const history = useHistory();

  const handleClick = () => {
    history.push('/done-recipes');
    const objDetails = {
      id: details[0].idMeal || details[0].idDrink,
      type: details[0].idMeal ? 'meal' : 'drink',
      nationality: details[0]?.strArea || '',
      category: details[0].strCategory,
      alcoholicOrNot: details[0].strAlcoholic || '',
      name: details[0].strMeal || details[0].strDrink,
      image: details[0].strMealThumb || details[0].strDrinkThumb,
      doneDate: new Date(Date.now()),
      tags: details[0].strTags ? details[0].strTags.split(',') : [],
    };

    saveDoneRecipes(objDetails);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ disableBtnFinish }
        onClick={ () => handleClick() }
      >
        Finish Recipe
      </button>
    </div>
  );
}
