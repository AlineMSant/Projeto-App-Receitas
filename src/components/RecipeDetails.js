import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchIdMeal, fetchIdDrink } from '../services/fetchAPI';

function RecipeDetails() {
  const history = useHistory();
  const { pathname } = history.location;
  const id = pathname.substring(pathname.lastIndexOf('/') + 1);

  useEffect(() => {
    const requestIdMeal = async () => {
      await fetchIdMeal(id);
      // return request;
    };

    const requestIdDrink = async () => {
      await fetchIdDrink(id);
      // return request;
    };
    if (pathname === `/meals/${id}`) {
      requestIdMeal();
    }
    if (pathname === `/drinks/${id}`) {
      requestIdDrink();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Recipe Details</h1>
    </div>
  );
}

export default RecipeDetails;
