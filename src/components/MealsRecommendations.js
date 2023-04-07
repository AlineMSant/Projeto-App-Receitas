import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import { fetchMeals } from '../services/fetchAPI';

function MealsRecommendations() {
  const {
    setMealsRecommendations,
  } = useContext(RecipesContext);

  useEffect(() => {
    const requestMeals = async () => {
      const result = await fetchMeals();
      setMealsRecommendations(result);
    };

    requestMeals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <h3>
      Recommendations Meals
    </h3>
  );
}

export default MealsRecommendations;
