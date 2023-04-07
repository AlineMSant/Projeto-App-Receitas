import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import { fetchDrinks } from '../services/fetchAPI';

function DrinksRecommendations() {
  const {
    setDrinksRecommendations,
  } = useContext(RecipesContext);

  useEffect(() => {
    const requestDrinks = async () => {
      const result = await fetchDrinks();
      setDrinksRecommendations(result);
    };

    requestDrinks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <h3>
      Recommendations Drinks
    </h3>
  );
}

export default DrinksRecommendations;
